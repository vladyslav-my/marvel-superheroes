-- CreateTable
CREATE TABLE `Superhero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(191) NOT NULL DEFAULT '',
    `real_name` VARCHAR(191) NOT NULL DEFAULT '',
    `origin_description` TEXT NOT NULL,
    `superpowers` VARCHAR(191) NOT NULL DEFAULT '',
    `catch_phrase` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `superheroId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_superheroId_fkey` FOREIGN KEY (`superheroId`) REFERENCES `Superhero`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

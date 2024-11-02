export const getMainRoutePath = () => "/";
export const getSuperheroRoutePath = (id?: number | string) => `/superhero${id ? `/${id}` : ""}`;

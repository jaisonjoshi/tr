export const generateUrl = (url) => {
    if (!url) {
      // Handle the case where 'url' is undefined or null
      return '';
    }
  
    const [baseUrl, ...rest] = url.split("/upload/");
  
    return `${baseUrl}/upload/c_fill,w_400/f_auto/q_auto/${rest.join("/upload/")}`;
  };
  
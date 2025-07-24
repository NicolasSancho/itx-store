export const formatProduct = (product) => {
  if (!product) return null;

  return {
    id: product.id,
    brand: product.brand,
    model: product.model,
    price: product.price !== '' ? product.price : 'Free',
    imgUrl: product.imgUrl,
    networkTechnology: product.networkTechnology,
    networkSpeed: product.networkSpeed,
    sim: product.sim,
    displayType: product.displayType,
    displayResolution: product.displayResolution,
    displaySize: product.displaySize,
    cpu: product.cpu,
    os: product.os,
    battery: product.battery,
    options: {
      colors: product.options?.colors || [],
      storages: product.options?.storages || [],
    },
  };
};

export const formatProductList = (products) => (
  products.map((product) => ({
    id: product.id,
    title: product.model,
    price: product.price !== '' ? product.price : 'Free',
    imageUrl: product.imgUrl,
    brand: product.brand,
  }))
);

export const formatProductDetails = (product, specKeys = []) => {
  if (!product) return [];

  const base = [
    { label: 'Brand', value: product.brand },
    { label: 'Model', value: product.model },
    { label: 'Price', value: `${product.price} €` },
  ];

  const specs = specKeys
    .filter((key) => Boolean(product[key]))
    .map((key) => ({
      label: key
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (l) => l.toUpperCase()), // "displaySize" → "Display Size"
      value: product[key],
    }));

  return [...base, ...specs];
};

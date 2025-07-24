import {
  formatProduct,
  formatProductList,
  formatProductDetails,
} from '../utils/productFormatters';

const mockProduct = {
  id: '123',
  brand: 'Zara',
  model: 'Z-Shirt',
  price: '',
  imgUrl: 'https://example.com/image.jpg',
  networkTechnology: '4G',
  sim: 'Dual SIM',
  displaySize: '6.1"',
  cpu: 'Snapdragon',
  os: 'Android',
  battery: '4000mAh',
  options: {
    colors: [{ name: 'Red', code: 1 }],
    storages: [{ name: '64GB', code: 2 }],
  },
};

describe('formatProduct', () => {
  it('should format a product object with defaults', () => {
    const formatted = formatProduct(mockProduct);
    expect(formatted).toMatchObject({
      id: '123',
      brand: 'Zara',
      model: 'Z-Shirt',
      price: 'Free',
      imgUrl: expect.any(String),
      options: {
        colors: expect.any(Array),
        storages: expect.any(Array),
      },
    });
  });
});

describe('formatProductList', () => {
  it('should format a list of products for grid display', () => {
    const formattedList = formatProductList([mockProduct]);
    expect(formattedList).toEqual([
      {
        id: '123',
        title: 'Z-Shirt',
        price: 'Free',
        imageUrl: 'https://example.com/image.jpg',
        brand: 'Zara',
      },
    ]);
  });
});

describe('formatProductDetails', () => {
  it('should format details with base + spec keys', () => {
    const result = formatProductDetails(mockProduct, ['cpu', 'os', 'battery']);
    expect(result).toEqual([
      { label: 'Brand', value: 'Zara' },
      { label: 'Model', value: 'Z-Shirt' },
      { label: 'Price', value: ' €' },
      { label: 'Cpu', value: 'Snapdragon' },
      { label: 'Os', value: 'Android' },
      { label: 'Battery', value: '4000mAh' },
    ]);
  });

  it('should return only base if spec keys not found', () => {
    const result = formatProductDetails(mockProduct, ['nonexistent']);
    expect(result.length).toBe(3); // Brand, Model, Price
  });

  it('should return empty array if product is null', () => {
    expect(formatProductDetails(null)).toEqual([]);
  });
});

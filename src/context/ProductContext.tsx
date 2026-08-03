"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, products as initialProducts } from '../data/products';

interface ProductContextProps {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetCatalog: () => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productsState, setProductsState] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  // Initialize and load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('koffie-rakjat-products');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Repair legacy product schemas to prevent runtime exceptions
          const repaired = parsed.map((p: any) => {
            let descObj = p.description;
            if (typeof descObj === 'string' || !descObj) {
              descObj = { id: descObj || '', en: descObj || '' };
            }
            let priceObj = p.prices;
            if (!priceObj || typeof priceObj !== 'object') {
              priceObj = { 
                '100g': p.price || 45000, 
                '200g': (p.price || 45000) * 1.8, 
                '1kg': (p.price || 45000) * 7.5 
              };
            }
            return {
              id: p.id || `coffee-${Date.now()}-${Math.random()}`,
              name: p.name || 'Specialty Coffee',
              category: (p.category === 'espresso' ? 'espresso' : 'filter') as 'filter' | 'espresso',
              origin: p.origin || 'Nusantara',
              roastLevel: (p.roastLevel === 'Light' || p.roastLevel === 'Dark' ? p.roastLevel : 'Medium') as 'Light' | 'Medium' | 'Dark',
              tasteNotes: Array.isArray(p.tasteNotes) ? p.tasteNotes : [],
              prices: priceObj,
              isLimited: !!p.isLimited,
              isPreOrder: !!p.isPreOrder,
              imageUrl: p.imageUrl || '/images/coffee-pack-filter.jpg',
              description: descObj
            } as Product;
          });
          setProductsState(repaired);
        } else {
          setProductsState(initialProducts);
        }
      } catch (e) {
        console.error('Failed to parse local storage products', e);
        setProductsState(initialProducts);
      }
    } else {
      // Setup initial default products
      localStorage.setItem('koffie-rakjat-products', JSON.stringify(initialProducts));
      setProductsState(initialProducts);
    }
    setMounted(true);
  }, []);

  // Save changes to localStorage
  const saveProducts = (updatedList: Product[]) => {
    setProductsState(updatedList);
    localStorage.setItem('koffie-rakjat-products', JSON.stringify(updatedList));
  };

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    // Generate simple unique ID based on slugified name + timestamp
    const slug = newProduct.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const id = `${slug}-${Date.now()}`;
    const productWithId: Product = { ...newProduct, id };
    
    saveProducts([...productsState, productWithId]);
  };

  const updateProduct = (updatedProduct: Product) => {
    saveProducts(
      productsState.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    saveProducts(productsState.filter((product) => product.id !== id));
  };

  const resetCatalog = () => {
    saveProducts(initialProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        products: mounted ? productsState : [],
        addProduct,
        updateProduct,
        deleteProduct,
        resetCatalog,
      }}
    >
      <div className={mounted ? "contents" : "invisible"}>
        {children}
      </div>
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

import create from 'zustand'

const useCart = create((set,get)=>({
  items: JSON.parse(localStorage.getItem('cart')||'[]'),
  add: (item)=>{
    const items = [...get().items, item];
    localStorage.setItem('cart', JSON.stringify(items));
    set({ items });
  },
  remove: (id)=>{
    const items = get().items.filter(i=>i.product !== id);
    localStorage.setItem('cart', JSON.stringify(items));
    set({ items });
  },
  clear: ()=>{ localStorage.removeItem('cart'); set({ items: [] }); }
}))

export default useCart

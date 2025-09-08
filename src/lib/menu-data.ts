
export interface MenuItem {
    name: string;
    description?: string;
    price: number;
}
  
export interface MenuCategory {
    title: string;
    items: MenuItem[];
}
  
export interface Menu {
    title: string;
    description: string;
    categories: MenuCategory[];
}
  
export const streetFoodMenu: Menu = {
  title: 'American Style Street Food',
  description: 'Authentic American flavors and comfort food favorites',
  categories: [
    {
      title: "DEAL'ICIOUS BURGER DEALS",
      items: [
        { name: 'Burger & Fries', description: 'Classic beef burger with a side of crispy fries.', price: 12.50 },
        { name: 'Double Trouble', description: 'Two patties, double cheese, and all the fixings.', price: 15.50 },
      ],
    },
    {
      title: 'SMASH BURGERS',
      items: [
        { name: 'Classic Smash', description: 'Smashed patty, american cheese, pickles, onion, and house sauce.', price: 9.00 },
        { name: 'Bacon BBQ Smash', description: 'Smashed patty, bacon, cheddar, BBQ sauce, and crispy onions.', price: 11.00 },
      ],
    },
    {
      title: 'PROPER LOADED NACHOS',
      items: [
        { name: 'Chilli Cheese Nachos', description: 'Loaded with beef chilli, cheese sauce, salsa, and jalapeños.', price: 10.50 },
        { name: 'Veggie Nachos', description: 'Topped with five-bean chilli, cheese sauce, salsa, and guacamole.', price: 9.50 },
      ],
    },
    {
      title: "CHEF'S SPECIALS",
      items: [
        { name: 'The Goliath Burger', description: 'Triple stacked burger with everything on it. Not for the faint hearted.', price: 18.00 },
        { name: 'Spicy Chicken Sandwich', description: 'Buttermilk fried chicken with a spicy slaw.', price: 12.00 },
      ],
    },
    {
      title: 'CHICKEN WINGS',
      items: [
        { name: 'Buffalo Wings', description: 'Classic spicy buffalo sauce, served with blue cheese dip.', price: 8.50 },
        { name: 'BBQ Wings', description: 'Smoky and sweet BBQ glaze.', price: 8.50 },
      ],
    },
    {
      title: 'FILTHY FRIES',
      items: [
        { name: 'Bacon Cheese Fries', description: 'Crispy fries topped with cheese sauce and bacon bits.', price: 7.50 },
        { name: 'Truffle Parmesan Fries', description: 'Fries tossed in truffle oil and parmesan cheese.', price: 8.00 },
      ],
    },
  ],
};
  
export const drinksMenu: Menu = {
    title: 'Craft Beer & Cocktails',
    description: 'Expertly crafted drinks to complement your experience.',
    categories: [
      {
        title: 'DRAFT BEERS',
        items: [
          { name: 'Cyber Haze IPA', description: 'A juicy, hazy IPA with notes of citrus and tropical fruit.', price: 6.50 },
          { name: 'Neon Lager', description: 'A crisp, clean, and refreshing pilsner-style lager.', price: 5.50 },
        ],
      },
      {
        title: 'SIGNATURE COCKTAILS',
        items: [
          { name: 'The Matrix', description: 'A mind-bending mix of gin, Midori, and a hint of lime.', price: 12.00 },
          { name: 'Glitch in the System', description: 'A vibrant blue curaçao and vodka concoction.', price: 11.00 },
        ],
      },
    ],
  };

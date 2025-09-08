
export interface MenuItem {
    name: string;
    description?: string;
    price: number;
}
  
export interface MenuCategory {
    title: string;
    items: MenuItem[];
    description?: string;
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
        { name: "Deal'icious OG Burger", description: 'One British Beef Pattie, Cheese, Onion, Bbq, Nacho Cheese Sauce, Brioche Bun', price: 5.00 },
        { name: "Deal'icious Chicken Burger", description: 'Chicken, Lettuce, Garlic, Mayo, Cheese, Brioche Bun', price: 5.00 },
        { name: "Deal'icious HLT Burger", description: 'Pan fried Halloumi, Lettuce, Chili Jam, Brioche Bun', price: 5.00 },
        { name: 'All Day Breakfast', description: 'Two Sausages, Fried Egg, Bacon, Beans', price: 8.00 },
        { name: 'Bacon Bap', description: 'Two slices of Thick Bacon, Soft Flour Bap', price: 4.00 },
        { name: 'The Filler', description: 'Two Fried Eggs, Two Slices of Bacon, Two Sausages, Soft Flour Bap', price: 10.00 },
      ],
    },
    {
        title: 'PROPER LOADED NACHOS',
        description: 'All served with Nacho Cheese, Cheddar Cheese, BBQ Sauce, Sour Cream, Salsa, Spring Onion, Guacamole, Jalapenos, Red Pickled Onion, Black Onion Seeds, Crispy Onions',
        items: [
            { name: 'Hot and Smoky Beef Brisket', price: 8.50 },
            { name: 'Sweet and Sticky Pulled Pork', price: 8.50 },
            { name: 'Chili Beef Nachos', price: 8.50 },
            { name: 'Classic Nachos', price: 7.95 },
        ],
    },
    {
        title: 'SMASH BURGERS',
        description: '{Oklahoma Style} 100% British Beef Freshly Ground Each Day - Never From Frozen. All Burgers Served With An In House Cheese Dipping Sauce, Dunk That Burger! Messy But Oh-so-worth It!',
        items: [
            { name: 'The O.G Burger', description: 'Two 4oz British Beef Patties, Bacon, American Cheese, Bacon jam, House Sauce', price: 10.00 },
            { name: 'The Chimi Burger', description: 'Two 4oz British Beef Patties, Avocado, American Cheese, Crispy Onions, in house Chimichurri Sauce', price: 11.00 },
            { name: 'The Farmyard Burger', description: 'Two 4oz British Beef Patties, Pulled Pork, american Cheese, Crispy Onions, Smokey BBQ Sauce, Bacon jam', price: 11.00 },
            { name: 'The Beef on Beef Burger', description: 'Two 4oz British Beef Patties, Beef Brisket, american cheese, Peppered Brisket Gravy, Crispy Onions, Cheese Sauce', price: 11.00 },
            { name: 'The Hotter Than Hell Burger', description: 'Two 4oz British Beef Patties, Hotter than hell Ghost Chili Pepper Sauce, Habanero, American Cheese, Mozzarella, Cheese Pattie, Lettuce, Onion, Bacon, Rocket, Brioche Bun - Latex Gloves', price: 15.00 },
            { name: 'The \'Green\' Burger V', description: 'Spinach and Lentil Patty, Pan Fried Halloumi, Chili Jam, shredded lettuce, vegan cheese', price: 9.00 },
            { name: 'The Chili Cheese Burger', description: 'Two 4oz british beef patties, beef chili, double american cheese, sour cream, salsa, fried onion', price: 11.00 },
            { name: 'The Naked Burger', description: 'Two 4oz British beer patties, American cheese, no sauce, no lettuce', price: 9.00 },
            { name: 'The Mc\'Cluckin Burger', description: 'Coated Chicken Breast, Cheese, Mayo, lettuce', price: 10.00 },
            { name: 'The Mac \'n\' Cheese Burger', description: 'Two 4oz British Beef Patties, Mac \'n\' Cheese pattie, Crispy Onions, Black Onion Seeds, nacho cheese sauce', price: 11.00 },
            { name: 'The Stark Naked Burger', description: 'Two 4oz british beef patties - meat only', price: 7.00 },
            { name: 'The Phat B****** Burger', description: 'Three 4oz British Beef patties, bbq pulled pork, bacon, bacon jam, american cheese, shredded lettuce', price: 15.00 },
            { name: 'The Cheesy Burger V', description: 'Two Breaded Mac \'n cheese patties, american cheese, crispy onions, nacho cheese sauce', price: 10.00 },
            { name: 'The Bird and Cow Burger', description: 'Two 4oz British Beef Patties, Shredded BBQ smoked Chicken, bacon jam, Bbq sauce, nacho cheese sauce', price: 11.00 },
            { name: 'The Halloumi Burger V', description: 'Pan fried salted Halloumi, mac \'n\' cheese pattie, Lettuce, Chili Jam', price: 10.00 },
            { name: 'The Cor Blimey Burger', description: 'Two 4oz British Beef Patties, Crispy Bacon, Mozzarella cheese, Lettuce, Onion, Tomato, Gherkins, Ranch Dressing, Bbq Sauce', price: 11.00 },
            { name: 'The Matt Attack Burger', description: 'Two 4oz British Beef Patties, American cheese, Crispy Bacon, Fried egg, Grilled Pineapple, Tomato, Lettuce, House Sauce', price: 11.00 },
            { name: 'The Bunless Burger', description: 'One 4oz British Beef Pattie, Two Mac \'n\' Cheese Patties, Chili Jam', price: 11.00 },
        ],
    },
    {
        title: 'THE JACKETS',
        description: 'Slow cooked in a Jacket Oven with Olive Oil and Salt and Pepper. Crispy on the outside, fluffy on the inside',
        items: [
            { name: 'Chicken Curry, Cheddar Cheese & Crispy Onions Jacket', price: 8.00 },
            { name: 'Cheese and Baked Beans Jacket V', price: 6.50 },
            { name: 'BBQ Pulled Pork Jacket', price: 8.00 },
            { name: 'Beef Brisket and Cheese Jacket', price: 8.00 },
            { name: 'Coleslaw & Cheese Jacket V', price: 6.50 },
            { name: 'Chili Beef Jacket with Cheese', price: 8.00 },
            { name: 'Baked Beans and Vegan Cheese Jacket (Ve)', price: 6.50 },
        ],
    },
    {
      title: 'CHEFS SPECIALS',
      items: [
        { name: 'The Quesadilla', description: '8oz Iron Steak Quesadilla, Tortilla Wrap, Served With a Honey Jack Daniels Dipping Sauce', price: 12.00 },
        { name: 'The Devils Jalapeno Popper', description: 'In-house made Popper, Deep fried in breadcrumbs, Bacon Bits, Three Cheeses, Jalapeno - served on a bed of Rocket with in-house Spicy Sauce', price: 6.00 },
        { name: 'The Chili Bowl', description: 'Homemade mild Beef Chili served in an Edible Bowl', price: 9.00 },
      ],
    },
    {
      title: 'FILTHY FRIES',
      description: 'Think Saucy. Think Loaded. Think Pure Filth',
      items: [
        { name: 'Steak Carne Asada Filthy Fries', description: '8oz Sliced Flat Iron Steak, Chimichurri Sauce, Cheddar Cheese, Crispy Onions with a choice of: Asada Sauce, 3 Peppercorn Sauce or honey jack daniels peppercorn sauce', price: 15.95 },
        { name: 'BBQ Pulled Pork Filthy Fries', description: 'Crispy Onions, Guacamole, BBQ Sauce', price: 12.50 },
        { name: 'Beef Brisket Filthy Fries', description: 'Cheese Sauce, Peppered Brisket Gravy, Crispy Onions, Spring Onions, Rocket', price: 12.50 },
        { name: 'BBQ Cauliflower Florets V', description: 'Guacamole, Cheese, Crispy Onions, Spring Onion, Black Onion Seeds (Vegan option available)', price: 10.95 },
        { name: 'Chinese Chicken Curry Filthy Fries', description: 'Chinese Chicken Curry, Cheddar Cheese, Crispy Onion', price: 11.95 },
        { name: 'Beef Chili Filthy Fries', description: 'In-House mild spice Beef Chili, Grated Mozzarella and Cheddar Cheese, Philadelphia Cheese, garnished with Chives', price: 12.50 },
        { name: 'BBQ Chicken Filthy Fries', description: 'Shredded Chicken, Bbq Sauce, Mayonnaise, Nacho Cheese Sauce, Crispy Onion, Spring Onion, Black Onion seeds', price: 12.50 },
        { name: 'All Day Breakfast Filthy Fries', description: 'Sausage, Fried Egg, Bacon, Beans', price: 12.50 },
      ],
    },
    {
        title: 'THE DOGS',
        description: 'Frankfurt Sausages Served in a Brioche Bun',
        items: [
            { name: 'The OG Dog', description: 'Fried Onions, Mustard, Ketchup', price: 5.95 },
            { name: 'The Double Dog', description: 'BBQ Pulled Pork, Crispy Onions', price: 8.00 },
            { name: 'The Big Daddy Dog', description: 'Beef Brisket, Crispy Onions', price: 8.00 },
            { name: 'The Curry Dog', description: 'Curry Sauce, Cheddar Cheese, Nacho Cheese, Crispy Onions', price: 8.00 },
            { name: 'The Chili Beef Dog', description: 'Chili Beef, Cheese and Crispy Onions', price: 8.00 },
            { name: 'The Big Weiner', description: 'XXL Dog, Fried Onions, Mustard, Ketchup', price: 10.00 },
        ],
    },
    {
        title: 'CHICKEN WINGS',
        items: [
            { name: '4 wings', price: 5.00 },
            { name: '8 wings', price: 8.00 },
            { name: '12 wings', price: 10.00 },
            { name: 'Now choose your sauce', description: 'Buffalo sauce, in-house spicy sauce, bbq sauce, plain, garlic & herb' , price: 0},
        ],
    },
    {
        title: 'CHIPS',
        items: [
            { name: 'Chips', description: 'All chips come with a lashing of either Sour Cream, Bbq Sauce, Franks Hot Sauce, In-House Spicy Sauce. Served with Spring Onions, Crispy Onions, Black Onion Seeds. Choose from the seasonings below: Plain, Peri Peri, Paprika and Garlic, Cajun, Salt & Pepper', price: 3.95 },
            { name: 'Plain Chips', price: 2.95 },
        ],
    },
    {
        title: 'SALAD',
        items: [
            { name: 'Cheeseburger Salad', description: 'Smashed up beef patty, bacon bits, shredded lettuce, tomato, fried onion, american cheese, nacho cheese, gherkins, Jalapenos, red pickle onion, black onion seeds', price: 7.00 },
            { name: 'Cauliflower Salad', description: 'Shallow fried battered cauliflower florets, shredded lettuce, red pickle onion, bbq sauce, nacho cheese sauce, black onion seeds', price: 7.00 },
        ],
    },
    {
        title: 'SNACKY BITS',
        items: [
            { name: 'Halloumi Fries', description: '6 Halloumi Fries with the choice of 2 sauces', price: 5.95 },
            { name: '7 onion rings', price: 3.50 },
        ],
    },
    {
        title: 'EXTRAS',
        items: [
            { name: 'Sauces', description: 'Bbq Sauce, Buffalo Sauce, Sour Cream, Nacho Cheese Sauce, Chili Jam, in-house Spicy Sauce, Bacon Jam, Salsa', price: 0.75 },
            { name: 'Gravy', price: 2.50 },
            { name: 'Pot of Jalapenos', price: 1.00 },
            { name: 'Pot of Gherkins', price: 1.00 },
            { name: 'In-House Cheese Dipping Sauce', price: 2.50 },
            { name: 'British Beef Pattie', price: 3.00 },
            { name: 'Mac \'n\' Cheese Pattie', price: 4.00 },
            { name: 'Mozzarella Cheese Pattie', price: 4.00 },
        ],
    },
    {
        title: 'CHILDRENS MEALS',
        description: 'Served with Peas or Beans',
        items: [
            { name: 'Mini Smash Cheeseburger, Mini Brioche Bun, Chips', price: 5.50 },
            { name: 'Mac \'n\' Cheese', price: 5.50 },
            { name: 'Chicken Nuggets and chips', price: 5.50 },
            { name: 'Quorn Nuggets and Chips', price: 5.50 },
            { name: 'Hot Dog and Chips Served in a brioche bun', price: 5.50 },
            { name: 'Sausage and Chips', price: 5.50 },
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

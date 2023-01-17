# Full Stack NodeJS Exam Project

by Simon Gredal

Watch this space 👀

## What is this?
This software tries to be a web shop and accompanying administration system. 

## Features

- Accounts Sign Up
- Accounts Sign In
- Admin accounts can
  - Access to an inventory management system
  - Access order overview system
  - Chat with customers
- Normal accounts can
  - Add items to their basket
  - View previous orders
  - Chat with support
- Anyone can
  - Browse the web shop, and sort _Product Collections_ by price
  - Search the web shop, ranked by how well it matches, _Product Model_ name, tags, description


The inventory management systems tries to support a few taxonomies to make it more
sophisticated. A _Product_ can declare user-defined traits. Example:

We can create a _Department_ (like a department in a store), say "Mens Clothes".
A _Department_ can contain _Product Categories_, say "Pants", "Shirts", or "Footwear".
A _Product Category_ can contain _Product Collections_, say "Jeans", "Dress Pants", and "Shorts".
A _Product Collection_ can contain _Product Models_, say "Levi's 501 Jeans".
A _Product Model_ can define its _Traits_, say "Color", "Length", "Width", or "Size".
A _Product Model_ can also define _Tags_, small text strings in order to make search better.

We can also create specific _Products_ (or SKUs). A single _Product_ can declare which
_Product Model_ it belongs to and define the values of its _Traits_.







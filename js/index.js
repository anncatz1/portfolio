/*!
 * Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

import { createRoot } from "react-dom/client";

// function NavigationBar() {
//   // TODO: Actually implement a navigation bar
//   return <h1>Hello from React!</h1>;
// }

const domNode = document.getElementById("books");
const root = createRoot(domNode);
root.render(<Books />);

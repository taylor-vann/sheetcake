import { compose, draw } from "./deps.ts";
import {
  addStylesheet,
  getStylesheetMap,
  queueStylesheet,
  style,
} from "../../v0.1/src/sheetcake.ts";

queueStylesheet("document");
const bluebox = style`
	background-color: blue;
	color: white;
	padding: 4px 8px;
`;
console.log(getStylesheetMap());
addStylesheet(document.head, "document");
console.log(getStylesheetMap());

const introDemo = compose<void, void>({
  connect: () => {},
  update: () => {
    return draw`
      <section id="parsley-dom">
        <h1 class="${bluebox}">SHEETCAKE</h1>
        <h2>Quick Start</h2>
        <p>Brian Taylor Vann</p>
      </section>
    `;
  },
  disconnect: () => {},
});

const introDemoChunk = introDemo();

export { introDemoChunk };

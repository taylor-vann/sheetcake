import { attach } from "./deps.ts";
import { introDemoChunk } from "./introduction.ts";

const demoContent = [
  introDemoChunk,
];

const mainElement = document.querySelector("main");
if (mainElement !== null) {
  attach(mainElement, demoContent);
}

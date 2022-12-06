/**
 * @jest-environment node
 */

const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
jest.dontMock("fs");

let document;

describe("HTML Test", function () {
  beforeAll((done) => {
    jest.setTimeout(30000);
    let { window } = new JSDOM(html, {
      resources: "usable",
      runScripts: "dangerously",
    });
    window.addEventListener("load", () => {
      document = window.document.body;
      setTimeout(() => {
        done();
      }, 3000);
    });
  });
  test("should render heading correctly", () => {
    const headingEl = document.getElementsByTagName("h1")[0];
    expect(headingEl).toBeDefined();

    expect(headingEl.innerHTML).toMatch(/Coding Ninjas./i);
  });

  test("should render description correctly", () => {
    const descEl = document.getElementsByTagName("p")[0];
    expect(descEl.innerHTML).toMatch(/Coding Ninjas was founded in 2016/i);
  });

  test("should render a list", () => {
    const listEl = document.getElementsByTagName("ul")[0];
    expect(listEl).toBeDefined();
  });

  test("should render course list with 3 items", () => {
    const listEl = document.getElementsByTagName("ul")[0];
    expect(listEl).toBeDefined();

    const listItemEl = listEl.children;
    expect(listItemEl).toHaveLength(3);
  });
  test("should render h3 for each course", () => {
    const listItemEl = document.getElementsByTagName("li");

    const headingEl = Array.from(listItemEl).map((el) =>
      el.getElementsByTagName("h3")
    );
    expect(headingEl).toHaveLength(3);
  });
});

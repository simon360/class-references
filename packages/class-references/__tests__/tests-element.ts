import { getClassReferences, setClassReferences } from "../src/element";
import { newObject } from "../src/referenceObject";

jest.mock("../src/referenceObject");

(newObject as any).mockReturnValue("mock new object");

describe("element", () => {
  const obj = {
    classes: {
      "class-1": [1, 2, 3],
      "class-2": [4, 5, 6]
    },
    lastToken: 6
  };
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement("div");
  });

  describe("getClassReferences", () => {
    it("should return a newObject if no data value exists", () => {
      expect(getClassReferences(element)).toBe(newObject());
    });

    it("should deserialize data value if it exists", () => {
      element.dataset.classReferences = JSON.stringify(obj);

      expect(getClassReferences(element)).toEqual(obj);
    });
  });

  describe("setClassReferences", () => {
    it("should serialize to data value", () => {
      setClassReferences(element, obj);

      expect(element.dataset.classReferences).toBe(JSON.stringify(obj));
    });
  });
});

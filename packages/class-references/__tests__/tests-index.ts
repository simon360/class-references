import { getClassReferences } from "../src/element";
import { releaseToken, requestTokenForClass } from "../src/index";
import {
  newObjectWithoutReferenceToToken,
  newObjectWithReferenceToClass
} from "../src/referenceObject";

jest.mock("../src/referenceObject");
jest.mock("../src/element");

describe("index", () => {
  const testClassName = "test__class-name";
  const fakeReferences = {
    classes: {},
    lastToken: 0
  };

  let element: HTMLElement;

  beforeEach(() => {
    (getClassReferences as any).mockReturnValue(fakeReferences);
    (newObjectWithReferenceToClass as any).mockReturnValue(fakeReferences);
    (newObjectWithoutReferenceToToken as any).mockReturnValue(fakeReferences);

    element = document.createElement("div");
  });

  describe("claimForClass()", () => {
    it("should add the class to the element's class list", () => {
      requestTokenForClass(element, testClassName);

      expect(element.classList.contains(testClassName)).toBe(true);
    });

    it("should return the token", () => {
      const token = 15412;
      (newObjectWithReferenceToClass as any).mockReturnValue({
        classes: [],
        lastToken: token
      });

      expect(requestTokenForClass(element, testClassName)).toBe(token);
    });
  });

  describe("release()", () => {
    it("should remove classes when all tokens are released", () => {
      (newObjectWithoutReferenceToToken as any).mockReturnValue({
        classes: {
          [testClassName]: []
        },
        lastToken: 12
      });

      element.classList.add(testClassName);

      releaseToken(element, 142); // actual token is irrelevant; mock takes care of it

      expect(element.classList.contains(testClassName)).toBe(false);
    });

    it("should not remove classes where tokens remain", () => {
      (newObjectWithoutReferenceToToken as any).mockReturnValue({
        classes: {
          [testClassName]: [3, 8]
        },
        lastToken: 12
      });

      element.classList.add(testClassName);

      releaseToken(element, 142); // actual token is irrelevant; mock takes care of it

      expect(element.classList.contains(testClassName)).toBe(true);
    });
  });
});

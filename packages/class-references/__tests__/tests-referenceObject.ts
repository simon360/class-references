import {
  newObject,
  newObjectWithoutReferenceToToken,
  newObjectWithReferenceToClass
} from "../src/referenceObject";

describe("referenceObject", () => {
  const testClassName = "test-class-name";
  const extraTestClassName = "extra-test-class-name";

  describe("newObject()", () => {
    it("should match snapshot", () => {
      expect(newObject()).toMatchSnapshot();
    });
  });

  describe("newObjectWithReferenceToClass()", () => {
    it("should add a new class reference", () => {
      const obj = newObject();

      expect(
        newObjectWithReferenceToClass(obj, testClassName)
      ).toMatchSnapshot();
    });

    it("should add to an existing class reference", () => {
      let obj = newObject();

      obj = newObjectWithReferenceToClass(obj, testClassName);
      obj = newObjectWithReferenceToClass(obj, testClassName);

      expect(obj).toMatchSnapshot();
    });

    it("should add multiple class names", () => {
      let obj = newObject();

      obj = newObjectWithReferenceToClass(obj, testClassName);
      obj = newObjectWithReferenceToClass(obj, extraTestClassName);
      obj = newObjectWithReferenceToClass(obj, testClassName);

      expect(obj).toMatchSnapshot();
    });
  });

  describe("newObjectWithoutReferenceToId()", () => {
    it("should not change an empty object", () => {
      const obj = newObject();
      const objRemoved = newObjectWithoutReferenceToToken(obj, 0);

      expect(objRemoved).toEqual(obj);
    });

    it("should not remove a non-existent reference", () => {
      let obj = newObject();

      obj = newObjectWithReferenceToClass(obj, testClassName);

      const objRemoved = newObjectWithoutReferenceToToken(obj, 14);

      expect(objRemoved).toEqual(obj);
    });

    it("should not immediately remove an empty list", () => {
      let obj = newObject();

      obj = newObjectWithReferenceToClass(obj, testClassName);
      obj = newObjectWithoutReferenceToToken(obj, obj.lastToken);

      expect(obj).toMatchSnapshot();
    });

    it("should remove a received empty list", () => {
      let obj = newObject();

      obj = newObjectWithReferenceToClass(obj, testClassName);
      obj = newObjectWithoutReferenceToToken(obj, obj.lastToken);
      obj = newObjectWithoutReferenceToToken(obj, obj.lastToken); // Call again to prune empties

      expect(obj).toMatchSnapshot();
    });

    it("should leave unaffected class names alone", () => {
      let obj = newObject();

      const removableTokens = [];

      obj = newObjectWithReferenceToClass(obj, testClassName);
      removableTokens.push(obj.lastToken);
      obj = newObjectWithReferenceToClass(obj, testClassName);
      removableTokens.push(obj.lastToken);

      obj = newObjectWithReferenceToClass(obj, extraTestClassName);
      obj = newObjectWithReferenceToClass(obj, extraTestClassName);

      let objRemoved = { ...obj };

      for (const token of removableTokens) {
        objRemoved = newObjectWithoutReferenceToToken(objRemoved, token);
      }

      expect(obj.classes[extraTestClassName]).toEqual(
        objRemoved.classes[extraTestClassName]
      );
      expect(objRemoved.classes[testClassName]).toEqual([]);
    });
  });
});

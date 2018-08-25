import { releaseToken, requestTokenForClass } from "class-references";
import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import ClassReference from "../src/ClassReference";

jest.mock("class-references");

describe("<ClassReference />", () => {
  const testClassName = "test-class-name";
  const fakeToken = 12;
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement("div");
    jest.resetAllMocks();

    (requestTokenForClass as any).mockReturnValue(fakeToken);
  });

  it("should match default snapshot", () => {
    expect(
      TestRenderer.create(
        <ClassReference element={element} classNameToAdd={testClassName}>
          Hello, world!
        </ClassReference>
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("should call claimForClass", () => {
    TestRenderer.create(
      <ClassReference element={element} classNameToAdd={testClassName}>
        Hello, world
      </ClassReference>
    );

    expect(requestTokenForClass).toHaveBeenCalledWith(element, testClassName);
  });

  it("should release on unmount", () => {
    const renderer = TestRenderer.create(
      <ClassReference element={element} classNameToAdd={testClassName}>
        Hello, world
      </ClassReference>
    );

    renderer.unmount();

    expect(releaseToken).toHaveBeenCalledWith(element, fakeToken);
  });

  it("should release and claim on element swap", () => {
    const extraElement = document.createElement("div");

    const Test = ({ testElement }: { testElement: HTMLElement }) => (
      <ClassReference element={testElement} classNameToAdd={testClassName}>
        Hello, world
      </ClassReference>
    );

    const renderer = TestRenderer.create(<Test testElement={element} />);

    renderer.update(<Test testElement={extraElement} />);

    expect(releaseToken).toHaveBeenCalledWith(element, fakeToken);
    expect(requestTokenForClass).toHaveBeenCalledWith(
      extraElement,
      testClassName
    );
  });

  it("should release and claim on class swap", () => {
    const extraClassName = "a-different-class-name";

    const Test = ({ classNameToAdd }: { classNameToAdd: string }) => (
      <ClassReference element={element} classNameToAdd={classNameToAdd}>
        Hello, world
      </ClassReference>
    );

    const renderer = TestRenderer.create(
      <Test classNameToAdd={testClassName} />
    );

    renderer.update(<Test classNameToAdd={extraClassName} />);

    expect(releaseToken).toHaveBeenCalledWith(element, fakeToken);
    expect(requestTokenForClass).toHaveBeenCalledWith(element, extraClassName);
  });
});

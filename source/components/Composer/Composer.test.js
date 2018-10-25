import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Composer } from "./";

// This added in setupEnzymeEnvironment.js
configure({ adapter: new Adapter() });

const props = {
  _createPost:          jest.fn(),
  avatar:               "",
  currentUserFirstName: ""
};

const comment = "Hi there";

const initialState = {
  comment: ""
};

const updatedState = {
  comment
};

const result = mount(<Composer { ...props} />);

const _submitCommentSpy = jest.spyOn(result.instance(), "_submitComment");
const _submitOnEnterSpy = jest.spyOn(result.instance(), "_submitOnEnter");
const _handleFormSubmitSpy = jest.spyOn(result.instance(), "_handleFormSubmit");

describe("Composer component", () => {
  test("should have 1 <section> element", () => {
    expect(result.find("section")).toHaveLength(1);
  });

  test("should have 1 <form> element", () => {
    expect(result.find("form")).toHaveLength(1);
  });

  test("should have 1 <textarea> element", () => {
    expect(result.find("textarea")).toHaveLength(1);
  });

  test("should have 1 <input> element", () => {
    expect(result.find("input")).toHaveLength(1);
  });

  test("should have 1 <img> element", () => {
    expect(result.find("img")).toHaveLength(1);
  });

  test("should have valid initial state", () => {
    expect(result.state()).toEqual(initialState);
  });

  test("textarea should be empty initially", () => {
    expect(result.find("textarea").text()).toBe("");
  });

  test("should respond to state change properly", () => {
    result.setState({
      comment,
    });

    expect(result.state()).toEqual(updatedState);
    expect(result.find("textarea").text()).toBe(comment);

    result.setState({
      comment: "",
    });

    expect(result.state()).toEqual(initialState);
    expect(result.find("textarea").text()).toBe("");
  });

  test("should handle textarea <change> event", () => {
    result.find("textarea").simulate("change", {
      target: {
        value: comment,
      },
    });

    expect(result.find("textarea").text()).toBe(comment);
    expect(result.state()).toEqual(updatedState);
  });

  test("should handle form <submit> event", () => {
    result.find("form").simulate("submit");

    expect(result.state()).toEqual(initialState);
  });

  test("_createPost prop should be invoked once after form submission", () => {
    expect(props._createPost).toHaveBeenCalledTimes(1);
  });

  test("_submitComment and _handleFormSubmit class methods should be invoked once after from is submit", () => {
    expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
    expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
  });

  test("don`t call _submitComment when no comment added", () => {
    expect(initialState.comment).toBe("");
    expect(_submitCommentSpy()).toBeNull();
  });

  test("_submitOnEnter when enter btn is clicked", () => {
    result.find("textarea").simulate('keypress', { key: "Enter" });
    expect(_submitOnEnterSpy).toHaveBeenCalledTimes(1);
  });

  test("don`t _submitOnEnter when not enter btn is clicked", () => {
    result.find("textarea").simulate('keypress', { key: "Esc" });
    expect(_submitCommentSpy()).toBeNull();
  });
});

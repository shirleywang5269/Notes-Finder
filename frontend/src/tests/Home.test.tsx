import React from "react";
import Home from "../components/Home";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Suggest } from "@blueprintjs/select";
import { IPatient } from "../types";

Enzyme.configure({ adapter: new Adapter() });

const wrapper = shallow(<Home />);
const mounted_wrapper = mount(<Home />);

describe("<Home>", () => {
  it("renders <App/> without crashing", () => {
    expect(wrapper.find(".App")).toBeTruthy();
  });

  it("contains a <header> with proper text", () => {
    expect(wrapper.find("header h1").text()).toBe("Note Finder.");
    expect(wrapper.find("header h3").text()).toBe(
      "Helping you get a better understanding of your medical notes"
    );
  });

  it("contains a <PatientSelect/>", () => {
    const PatientSelect = Suggest.ofType<IPatient>();
    expect(mounted_wrapper.find(PatientSelect)).toBeTruthy();
  });

  it("contains a <Button>", () => {});
});

import React from "react";
import { IPatient, fake_patients } from "../types";
import { MenuItem,Button, Popover,Position } from "@blueprintjs/core";
import { Suggest, ItemPredicate, ItemRenderer } from "@blueprintjs/select";
import { Redirect } from "react-router";
import "./Home.scss";

const PatientSelect = Suggest.ofType<IPatient>();

export interface IHomeState {
  patient: IPatient;
  redirect: Boolean;
}

class Home extends React.PureComponent<{}, IHomeState> {
  public state: IHomeState = {
    patient: fake_patients[0],
    redirect: false
  };

  private renderInputValue = (patient: IPatient) => patient.name;
  private handleValueChange = (patient: IPatient) => {
    this.setState({ redirect: true, patient });
  };

  render() {
    const patientSelectProps = {
      itemPredicate: filterPatient,
      itemRenderer: renderPatient,
      items: fake_patients
    };
    return (
      <div className="container">
        {this.state.redirect && (
          <Redirect to={`/patients/${this.state.patient.id}`} />
        )}
        <header>
          <h1>Note Finder.</h1>
          <h3>Helping you get a better understanding of your medical notes</h3>
        </header>
        <div className="search">
          <PatientSelect
            {...patientSelectProps}
            inputValueRenderer={this.renderInputValue}
            onItemSelect={this.handleValueChange}
            popoverProps={{ minimal: true }}
          />
        </div>
      </div>
    );
  }
}

const renderPatient: ItemRenderer<IPatient> = (
  patient,
  { handleClick, modifiers, query }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  const text = `${patient.name}.`;
  return (
    <Popover content={
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={patient.id.toString()}
      key={patient.id}
      onClick={handleClick}
      text={highlightText(text, query)}
      style={{ width: "700pt" }}
          />}
    position={Position.RIGHT_TOP}>
    <Button text={highlightText(text, query)} />
</Popover>


  );
};

const filterPatient: ItemPredicate<IPatient> = (query, patient) => {
  return (
    `${patient.id}. ${patient.name.toLowerCase()}`.indexOf(
      query.toLowerCase()
    ) >= 0
  );
};

function highlightText(text: string, query: string) {
  let lastIndex = 0;
  const words = query
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(escapeRegExpChars);
  if (words.length === 0) {
    return [text];
  }
  const regexp = new RegExp(words.join("|"), "gi");
  const tokens: React.ReactNode[] = [];
  while (true) {
    const match = regexp.exec(text);
    if (!match) {
      break;
    }
    const length = match[0].length;
    const before = text.slice(lastIndex, regexp.lastIndex - length);
    if (before.length > 0) {
      tokens.push(before);
    }
    lastIndex = regexp.lastIndex;
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
    tokens.push(rest);
  }
  return tokens;
}

function escapeRegExpChars(text: string) {
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

export default Home;

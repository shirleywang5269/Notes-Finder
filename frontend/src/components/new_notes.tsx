//same file but another notes

import * as React from 'react';
import {
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  InputGroup,
  Button,
  Breadcrumbs,
  IBreadcrumbProps,
  Divider,
  Icon,
  IActionProps,
  Checkbox
} from '@blueprintjs/core';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { RouteComponentProps } from 'react-router';
import { DateTimePicker } from '@blueprintjs/datetime';
import { Link } from 'react-router-dom';
import './Notes.scss';
import WordComponent from './WordComponent';
import { IPatient, fake_patients } from "../types";
import { Redirect } from "react-router";



interface MatchProps {
  id: string;
}

interface INotesProps extends RouteComponentProps<MatchProps> {}

interface IState {
  search_term: string;
  patient: IPatient;
  redirect: Boolean;
}


export default class Notes extends React.Component<INotesProps, IState> {
  componentDidMount() {
    document.title = `Note finder | Patient `;
  }

  public state: IState = {
    patient: fake_patients[0],
    redirect: false,
    search_term: "string"

  };


    private handleClick = () => {
        console.log('Button is cliked!');    
       // <Redirect to="/new"/>
       //<Redirect to={`/patients/${this.state.patient.id}`} />
       this.props.history.push("/");


    }

        private checkboxhandleClick = () => {
        console.log('Button is cliked!');    
       // <Redirect to="/new"/>
       //<Redirect to={`/patients/${this.state.patient.id}`} />
       //this.state.redirect && (this.props.history.push(`/patients/${this.state.patient.id}`));
       this.props.history.push(`/patients/${this.state.patient.id}`);


    }

  // Function called every time the header input text is changed
  private searchInputChanged = (e: React.FormEvent<HTMLInputElement>) => {
    const search_term = e.currentTarget.value;
    this.setState({ search_term });
  };

  // Function which is called when search is clicked
  private searchClicked = () => {
    console.log('search clicked ' + this.state.search_term);

  };

  public render() {
    return (
      <div className="container-notes">
        <header>
          <Navbar>
            <NavbarGroup>
              <NavbarHeading>Note Finder</NavbarHeading>
              <NavbarDivider />
               <InputGroup
                rightElement={
                  <Button
                    icon="search"
                    type="primary"
                    className="bp3-intent-primary"
                    onClick={this.searchClicked}
                  />
                }
                style={{ width: '400pt' }}
                onChange={this.searchInputChanged}
              />
            </NavbarGroup>
            <NavbarGroup align="right">
              <Button icon="home" text="Home" minimal onClick={this.handleClick}/>
              <Button icon="document" text="Saved" minimal />
              <NavbarDivider />
              <Button icon="user" minimal />
              <Button icon="notifications" minimal />
              <Button icon="cog" minimal />
            </NavbarGroup>
          </Navbar>
        </header>

        <Checkbox inline onChange={this.checkboxhandleClick} > <Icon icon="highlight" />  <strong> Recent loss or other significant negative event </strong></Checkbox>
             <div className="notes">
            <h5 >patient </h5>
            <h5 >The below is test content </h5>
            <Divider />
            <h5>March 7, 2014</h5>
          </div>
      </div>

    );
  }
}
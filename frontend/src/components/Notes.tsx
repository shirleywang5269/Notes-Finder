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
import { Redirect } from 'react-router-dom';




interface MatchProps {
  id: string;
}

interface INotesProps extends RouteComponentProps<MatchProps> {}

interface IState {
  search_term: string;
}


export default class Notes extends React.Component<INotesProps, IState> {
  componentDidMount() {
    document.title = `Note finder | Patient ${this.props.match.params.id}`;
  }

  private homehandleClick = () => {
        console.log('Button is cliked!');  
        //console.log(patient.id)  
       // <Redirect to="/new"/>
       this.props.history.push("/");


    }


    private checkboxhandleClick = () => {
        console.log('Button is cliked!');  
        //console.log(patient.id)  
       // <Redirect to="/new"/>
       this.props.history.push("/new");


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
    const ITEMS: IBreadcrumbProps[] = [
      { icon: 'folder-close', text: 'Home' },
      { icon: 'folder-close', text: 'Patients' },
      { icon: 'folder-close', text: this.props.match.params.id }
    ];
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
              <Button icon="home" text="Home" minimal onClick={this.homehandleClick} />
              <Button icon="document" text="Saved" minimal />
              <NavbarDivider />
              <Button icon="user" minimal />
              <Button icon="notifications" minimal />
              <Button icon="cog" minimal />
            </NavbarGroup>
          </Navbar>
        </header>

    <Checkbox inline onChange={this.checkboxhandleClick} > <Icon icon="highlight" />  <strong> Recent loss or other significant negative event </strong></Checkbox>
     <Checkbox inline onChange={this.checkboxhandleClick} > <Icon icon="highlight" />  <strong> Pending incarceration or homelessness  </strong></Checkbox>
      <Checkbox inline onChange={this.checkboxhandleClick} > <Icon icon="highlight" />  <strong> Current or pending isolation or feeling alone  </strong></Checkbox>
       <Checkbox inline onChange={this.checkboxhandleClick} > <Icon icon="highlight" />  <strong> Previous psychiatric diagnoses and treatments  </strong></Checkbox>
        <Checkbox inline  onChange={this.checkboxhandleClick} > <Icon icon="highlight" />  <strong> Hopeless or dissatisfied with treatment  </strong></Checkbox>
         <Checkbox inline onChange={this.checkboxhandleClick} > <Icon icon="highlight" />  <strong> Noncompliant with treatment  </strong></Checkbox>
          <Checkbox inline onChange={this.checkboxhandleClick} > <Icon icon="highlight" />  <strong> Not receiving treatment  </strong></Checkbox>
        <Breadcrumbs
          items={ITEMS}
          breadcrumbRenderer={this.renderNotCurrentBreadcrumb}
          currentBreadcrumbRenderer={this.renderCurrentBreadcrumb}
        />
        <div className="note-columns">
          <div className="notes">
            <h5 id="note0">patient {this.props.match.params.id} </h5>
            <WordComponent patient={this.props.match.params.id} />
            <Divider />
            <h5 id="note1">March 7, 2014</h5>
          </div>
          <div className="note-timeline">
            <h3>
              <Icon icon="calendar" /> Patient Timeline
            </h3>
           

          </div>
        </div>
      </div>
    );
  }
  private renderNotCurrentBreadcrumb = ({ text }: IBreadcrumbProps) => {
    // customize rendering of last breadcrumb
    return <Link to="/">{text}</Link>;
  };
  private renderCurrentBreadcrumb = ({ text }: IBreadcrumbProps) => {
    // customize rendering of last breadcrumb
    return <div>{text}</div>;
  };
}
import * as React from 'react';
import ReactTooltip from 'react-tooltip';
// import * as data from '../test.json'
import * as data from "../json_note_200.json";

interface MatchProps {
  patient: string;
}

// A utility function which finds words in a given list of words
function isInArray(list: Array<String>, word: string) {
  // Replace all non-alphabet letters from the word
  let clean_word = word.replace(/\W/g, '');
  return list.indexOf(clean_word.toLowerCase()) > -1;
}

export default class WordComponent extends React.Component<MatchProps, any> {
  constructor(props: MatchProps) {
    super(props);
    this.state = { id: this.props.patient};
  }

  displayNote(id: number) {
    // Choose a dummy doctor's note depending on what id is set
    let full_note = data["id"][id][0];
    // if (id === 1) {
    //   full_note = dummy_note;
    // } else {
    //   full_note = dummy_note_2;
    // }
    // Replace all the newline's with <br/>'s
    const br_replaced = full_note.replace(/(?:\r\n|\r|\n)/g, ' <br/> ');

    // Turn all the words into an array
    const array_of_words = br_replaced.split(' ');

    // List of test words from server that are worth highlighting
    const test_words: Array<String> = ['birth', 'chronic', 'fluid'];

    const test_words2: Array<String> =['sense',  'bipolar', 'death' ]
    

    // Return the HTML for a single note
    return (
      <div className="noteText">
        {/* Loop through individual words */}
        {array_of_words.map((word, index) => {
          // Check to see if we are on a <br/> in the text,
          // if so then return an actual HTML <br/> tag
          if (word.match(/<br\/>/g)) {
            return <br key={index} />;
          }

          // Check to see if this word is worth highlighting
          if (isInArray(test_words, word)) {
            return (
              <span
                key={index}
                data-tip
                data-for="happyFace"
                className="highlighted-word"
              >
                {word}
                <ReactTooltip
                  place="bottom"
                  type="success"
                  effect="solid"
                  id="happyFace"
                >
                  <span>Related to searched word</span>
                </ReactTooltip>
              </span>
            );
          }

          // We are not a <br/> tag so we can place a single word in the span
          return <span key={index}>{word} </span>;
        })}
      </div>
    );
  }

  public render() {
    return <div>{this.displayNote(this.state.id)}</div>;
  }
}

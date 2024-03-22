import React, { useState } from "react";
import {
  InstantSearch,
  connectSearchBox,
  Configure,
} from "react-instantsearch-dom";
import { saveTempAnswer, saveAnswer } from "store/users/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  getAnswerInstance,
  getAnswerEmpty,
  getAnswersByQid,
} from "utils/helpers/questionnaireHelper";
import { searchClient, searchIndex } from "config/initConfig";
import InputAutoComplete from "../InputAutoComplete";

import "./AutoCompleteQuestionnaire.scss";

const VirtalSearchBox = connectSearchBox(() => null);

const AutoCompleteQuestionnaire = (props) => {
  const [query, setQuery] = useState();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const answersSecteurs = getAnswersByQid(users.questionWithAnswers, "q2");
  let filters = "";

  if (answersSecteurs && answersSecteurs.length > 0) {
    for (let i = 0; i < answersSecteurs.length; i++) {
      if (i === 0) {
        filters = "codeSecteur:" + answersSecteurs[i].aid;
      } else {
        filters = filters + " OR codeSecteur:" + answersSecteurs[i].aid;
      }
    }
  }

  if (filters === "codeSecteur:O") {
    filters = "codeSecteur:M";
  }

  const answerTemplate = {
    qid: props.data.qid,
    question: props.data.question,
    type: props.data.type,
    anonymous: props.data.anonymous,
    resume:
      (props.data?.actions?.filter(
        (action) => action.value?.id === props.data?.qid + "bc001"
      ) || [])?.[0]?.value?.resume || "",
  };

  const getAnswerFromTemplate = (value) => {
    return {
      ...answerTemplate,
      answers: [
        {
          aid: "",
          value: value,
          path: "",
        },
      ],
    };
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    setQuery(suggestion.libelleAppellationCourt);
    dispatch(
      saveAnswer(getAnswerFromTemplate(suggestion.libelleAppellationCourt))
    );
    dispatch(
      saveTempAnswer([
        getAnswerInstance("", suggestion.libelleAppellationCourt, ""),
      ])
    );
  };

  const onSuggestionCleared = () => {
    setQuery("");
    dispatch(saveTempAnswer([getAnswerEmpty()]));
  };

  const onChange = (newValue, lastSelectedValue) => {
    if (lastSelectedValue === newValue) {
      dispatch(saveAnswer(getAnswerFromTemplate(newValue)));
      dispatch(saveTempAnswer([getAnswerInstance("", newValue, "")]));
    } else {
      dispatch(
        saveAnswer({
          ...answerTemplate,
        })
      );
      dispatch(saveTempAnswer([getAnswerEmpty()]));
    }
  };

  return (
    <div className="container">
      <InstantSearch indexName={searchIndex} searchClient={searchClient}>
        <Configure hitsPerPage={10} filters={filters} />
        <InputAutoComplete
          onSuggestionSelected={onSuggestionSelected}
          onSuggestionCleared={onSuggestionCleared}
          placeHolder={props.placeHolder}
          onChange={onChange}
          theme={{
            container: "react-autosuggest-questionnaire__container",
            containerOpen: "react-autosuggest-questionnaire__container--open",
            input: "react-autosuggest-questionnaire__input",
            inputOpen: "react-autosuggest-questionnaire__input--open",
            inputFocused: "react-autosuggest-questionnaire__input--focused",
            suggestionsContainer:
              "react-autosuggest-questionnaire__suggestions-container",
            suggestionsContainerOpen:
              "react-autosuggest-questionnaire__suggestions-container--open",
            suggestionsList:
              "react-autosuggest-questionnaire__suggestions-list",
            suggestion: "react-autosuggest-questionnaire__suggestion",
            suggestionFirst:
              "react-autosuggest-questionnaire__suggestion--first",
            suggestionHighlighted:
              "react-autosuggest-questionnaire__suggestion--highlighted",
            sectionContainer:
              "react-autosuggest-questionnaire__section-container",
            sectionContainerFirst:
              "react-autosuggest-questionnaire__section-container--first",
            sectionTitle: "react-autosuggest-questionnaire__section-title",
          }}
        />
      </InstantSearch>
      <InstantSearch indexName={searchIndex} searchClient={searchClient}>
        <VirtalSearchBox
          defaultRefinement={query}
          onChange={(evt) =>
            dispatch(
              saveTempAnswer([getAnswerInstance("", evt.target.value, "")])
            )
          }
        />
      </InstantSearch>
    </div>
  );
};

export default AutoCompleteQuestionnaire;

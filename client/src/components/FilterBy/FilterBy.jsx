import React from "react";
import { connect } from 'react-redux';
import { orderBy, filterBy } from "../../redux/actions";
import s from './filterBy.module.css'

const FilterBy = ({orderBy, genres, filterBy}) => {

  const handleSelectFilter = (e) => {
    filterBy(e.target.value)
  };

  const handleSelectOrder = (e) => {
    orderBy(e.target.value)
  };

  return(
    <div className={s.container}>
      <select className={s.selectCont} onChange={handleSelectFilter}>
        <option className={s.option} value="default">ALL...</option>
        <optgroup className={s.optionGroup} label="DataBase">
          <option className={s.option} value="DB">CREATED</option>
        </optgroup>
        <optgroup className={s.optionGroup} label="API">
          <option className={s.option} value="API">API</option>
        </optgroup>
        <optgroup className={s.optionGroup} label="GENRES">
          { genres && genres.map((g) => <option key={g.name} value={g.name}>  {g.name}  </option>) }
        </optgroup>
      </select>

      <select className={s.selectCont} onChange={handleSelectOrder}>
        <option className={s.option} value="default">ORDER...</option>
        <optgroup className={s.optionGroup} label="Rating">
          <option className={s.option} value="asc"> + to - </option>
          <option className={s.option} value="desc"> - to + </option>
        </optgroup>
        <optgroup className={s.optionGroup} label="Alphabetic">
          <option className={s.option} value="A-Z"> A - Z </option>
          <option className={s.option} value="Z-A"> Z - A </option>
        </optgroup>
      </select>
    </div>
  );
};

const mapStateToProps = (state) => {
  return{
    genres: state.genres
  }
};
export default connect(mapStateToProps, { orderBy, filterBy })(FilterBy);
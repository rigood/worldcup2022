import styled from "styled-components";

function RadioButtons({ setSort }) {
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <FiledSet>
      <Radio>
        <input
          type="radio"
          name="sort"
          value="accuracy"
          onChange={handleSortChange}
          defaultChecked
        />
        <span>정확도</span>
      </Radio>
      <Radio>
        <input
          type="radio"
          name="sort"
          value="recency"
          onChange={handleSortChange}
        />
        <span>최신순</span>
      </Radio>
    </FiledSet>
  );
}

export default RadioButtons;

const FiledSet = styled.fieldset``;

const Radio = styled.label``;

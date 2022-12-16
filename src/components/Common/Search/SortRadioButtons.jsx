import styled from "styled-components";

function SortRadioButtons({ setSort }) {
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <FiledSet>
      <Radio>
        <RadioInput
          type="radio"
          name="sort"
          value="accuracy"
          onChange={handleSortChange}
          defaultChecked
        />
        <span>정확도</span>
      </Radio>
      <Radio>
        <RadioInput
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

export default SortRadioButtons;

const FiledSet = styled.fieldset`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Radio = styled.label`
  display: flex;
  align-items: center;
  margin-left: 5px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray};
  cursor: pointer;
`;

const RadioInput = styled.input`
  vertical-align: middle;
  appearance: none;
  width: 5px;
  height: 5px;
  margin-right: 5px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.gray};
  &:checked {
    background-color: ${({ theme }) => theme.color.primary};
  }
  &:checked + span {
    color: ${({ theme }) => theme.color.primary};
  }
`;

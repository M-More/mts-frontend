// eslint-disable-next-line import/prefer-default-export
export const handleProgrammeChange = (prevState, data) => {
  console.log('handleProgrammeChange', data.curProgramme.name);
  return {
    ...prevState,
    curProgramme: data.curProgramme,
  };
};

/* eslint-disable import/prefer-default-export */
import actionSheetConstants from '../constants/actionSheet.constants';

const showPopUp = (isError, contentText, buttonText) => ({
    type: actionSheetConstants.SHOW_POP_UP,
    isError,
    contentText,
    buttonText,
});

const hidePopUp = () => ({
    type: actionSheetConstants.HIDE_POP_UP,
});

export const actionSheet = {
    showPopUp,
    hidePopUp,
};

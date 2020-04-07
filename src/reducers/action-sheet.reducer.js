import actionSheetConstants from '../constants/actionSheet.constants';

const actionSheet = (state, action) => {
    if (state === undefined) {
        return {
            isVisibleActionSheet: false,
            isError: false,
            contentText: '',
            buttonText: '',
        };
    }

    switch (action.type) {
    case actionSheetConstants.SHOW_POP_UP:
        return {
            isVisibleActionSheet: true,
            isError: action.isError,
            contentText: action.contentText,
            buttonText: action.buttonText,
        };

    case actionSheetConstants.HIDE_POP_UP:
        return {
            isVisibleActionSheet: false,
            isError: false,
            contentText: '',
            buttonText: '',
        };
    default:
        return state;
    }
};

export default actionSheet;

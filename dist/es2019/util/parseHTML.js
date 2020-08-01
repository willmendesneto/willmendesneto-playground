export const parseHTML = function (htmlString) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = htmlString;
    return wrapper.childNodes[0];
};
//# sourceMappingURL=parseHTML.js.map
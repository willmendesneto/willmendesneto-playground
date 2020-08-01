export const handleError = function (alias, description) {
    const stackTrace = Error().stack || '';
    const descr = description || '';
    const errorMessage = `${alias}: ${descr} \n ${stackTrace}`;
    // eslint-disable-next-line no-console
    console.error(errorMessage);
};
//# sourceMappingURL=handleError.js.map
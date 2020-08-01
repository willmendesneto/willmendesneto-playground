let isWebGLAvailableValue;
export const isWebGLAvailable = (forceCheck) => {
    if (isWebGLAvailableValue !== undefined && !forceCheck) {
        return isWebGLAvailableValue;
    }
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl'); // experimental-webgl is needed for IE11
    isWebGLAvailableValue = !!context;
    return isWebGLAvailableValue;
};
//# sourceMappingURL=webgl.js.map
export var normalizeRecentFilesAge = function (createdAt) {
    if (typeof createdAt !== 'number') {
        return 'N/A';
    }
    if (createdAt <= 0) {
        return 'Invalid';
    }
    var ttlTimeframes = [
        { timeLimitInMiliseconds: 3600000, label: '< 1 hour' },
        { timeLimitInMiliseconds: 86400000, label: '1 hour - 1 day' },
        { timeLimitInMiliseconds: 604800000, label: '1 day - 1 week' },
        { timeLimitInMiliseconds: 2629746000, label: '1 week - 1 month' },
        { timeLimitInMiliseconds: 15778476000, label: '1 month - 6 months' },
        { timeLimitInMiliseconds: 31536000000, label: '6 months - 1 year' },
    ];
    var recencyTimeInMiliseconds = new Date().getTime() - createdAt;
    var timeFrame = ttlTimeframes.find(function (_a) {
        var timeLimitInMiliseconds = _a.timeLimitInMiliseconds;
        return recencyTimeInMiliseconds < timeLimitInMiliseconds;
    });
    return timeFrame ? timeFrame.label : '> 1 year';
};
//# sourceMappingURL=normalizeRecentFilesAge.js.map
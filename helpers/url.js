const getSearchParams = (href, ignoreParams) => {
    try {
        const result = {};
        const url = new URL(href);
        for (const entry of url.searchParams) {
            if (!ignoreParams.includes(entry[0])) {
                result[entry[0]] = entry[1];
            }
        }
        return result;
    } catch (err) {
        return {};
    }
};

export const compareUrls = (firstHref, secondHref, ignoreParams = []) => {
    const firstParams = getSearchParams(firstHref, ignoreParams);
    const secondParams = getSearchParams(secondHref, ignoreParams);
    const diff = [];
    const eq = [];

    Object.entries(firstParams).forEach(([key, value]) => {
        if(secondParams.hasOwnProperty(key)){
            if(secondParams[key] === firstParams[key]){
                eq.push([key, value]);
            } else {
                diff.push([key, value, secondParams[key]]);
            }
            delete secondParams[key];
        } else {
            diff.push([key, value, null]);
        }
    });

    Object.entries(secondParams).forEach(([key, value]) => {
        diff.push([key, null, value]);
    });

    return [diff, eq];
};

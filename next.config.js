module.exports = {
    webpack(cfg) {
        const originalEntry = cfg.entry;

        cfg.entry = async () => {
            const entries = await originalEntry();

            return Object.entries(entries).reduce((acc, [key, value]) => {
                if (key.includes('__tests__')) {
                    return acc;
                }

                acc[key] = value;
                return acc;
            }, {});
        };

        return cfg;
    },
    exportPathMap: async (defaultPathMap) => defaultPathMap,
};

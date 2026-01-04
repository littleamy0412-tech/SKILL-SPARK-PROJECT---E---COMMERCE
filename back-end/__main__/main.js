module.exports = class {
    static __configurations__ = {
        __engine: null,
        __port: 6000,
        __url: null,
        __delay: 100,
    };

    static instance = null;

    static __set__CONFIG(
        target,
        value,
        successMessage,
        failedMessage,
        delay = this.__configurations__.__delay
    ) {
        return new Promise((resolve, reject) =>
            setTimeout(() => {
                try {
                    this.__configurations__[target] = value;
                    resolve({ success: 1, message: successMessage });
                } catch (err) {
                    reject({ success: 0, message: failedMessage, err });
                }
            }, delay)
        );
    }

    static __get__CONFIG(
        target,
        successMessage,
        delay = this.__configurations__.__delay
    ) {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve({
                    success: 1,
                    message: successMessage,
                    value: this.__configurations__[target],
                });
            }, delay)
        );
    }

    static conf = {
        get: () => {
            return new Promise((resolve) =>
                setTimeout(
                    () =>
                        resolve({
                            success: 1,
                            message: "FETCHED CONF DATA",
                            data: this.__configurations__,
                        }),
                    this.__configurations__.__delay
                )
            );
        },
        server: {
            set: (value) => {
                return this.__set__CONFIG(
                    "__engine",
                    value,
                    "Server Engine was configured successfully",
                    "Failed to configure Server Engine"
                );
            },
            get: () => {
                return this.__get__CONFIG(
                    "__engine",
                    "Server Engine was fetched successfully"
                );
            },
        },
        port: {
            set: (value) => {
                return this.__set__CONFIG(
                    "__port",
                    value,
                    "Server Port was configured successfully",
                    "Failed to configure Server Port"
                );
            },
            get: () => {
                return this.__get__CONFIG(
                    "__port",
                    "Server Port was fetched successfully"
                );
            },
        },
        db: {
            url: {
                set: (value) => {
                    return this.__set__CONFIG(
                        "__url",
                        value,
                        "Server's Database connection string was configured successfully",
                        "Failed to configure Server's Data Connection String"
                    );
                },
                get: () => {
                    return this.__get__CONFIG(
                        "__url",
                        "Server's Data connection string was fetched successfully"
                    );
                },
            },
        },
        def: {
            _delay: {
                set: (value) => {
                    return this.__set__CONFIG(
                        "__delay",
                        value,
                        "Server Default Tick value was changed",
                        "Failed to change Server Default Tick value"
                    );
                },
                get: () => {
                    return this.__get__CONFIG(
                        "__delay",
                        "Server Default Tick value was fetched successfully"
                    );
                },
            },
        },
    };

    static start = () => {
        if (this.__configurations__.__engine === null) {
            return {
                success: 0,
                message: "Server Engine not Initialized",
                err: `Server Engine (Current): ${this.__configurations__.__engine}`,
            };
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    this.instance = this.__configurations__.__engine.listen(
                        this.__configurations__.__port,
                        () => {
                            resolve({
                                success: 1,
                                message: "Server Started Successfully",
                                http:
                                    "http;//localhost:" +
                                    this.__configurations__.__port,
                            });
                        }
                    );
                } catch (err) {
                    reject({
                        success: 0,
                        message: "Failed to Start Server",
                        err,
                    });
                }
            }, this.__configurations__.__delay);
        });
    };

    static connect = () => {
        if (this.__configurations__.__url === null) {
            return {
                success: 0,
                message: "Server Connection String not Initialized",
                err: `Server Connection String (Current): ${this.__configurations__.__url}`,
            };
        }

        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    await require("mongoose").connect(
                        this.__configurations__.__url
                    );
                    resolve({
                        success: 1,
                        message:
                            "Connection To Database Established Successfully",
                    });
                } catch (err) {
                    reject({
                        success: 0,
                        message: "Failed to Establish Connection with Database",
                        err,
                    });
                }
            }, this.__configurations__.__delay);
        });
    };
}

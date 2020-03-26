/* eslint-disable */

export class DummyService {
    markets = [
        {
            id: "1",
            currencyPair: {
                assetCurrency: 'BTC',
                quotableCurrency: 'USDT',
            },
            lastPrice: '7212.479999999',
            dailyChangePercent: '1.91',
            dailyHight: '7686.08999998',
            dailyLow: '7130.00000001',
            dailyVolume: '373576048.37826187',
        },
        {
            id: "2",
            currencyPair: {
                assetCurrency: 'BTC',
                quotableCurrency: 'USDT',
            },
            lastPrice: '7212.479999999',
            dailyChangePercent: '-1.91',
            dailyHight: '7686.08999998',
            dailyLow: '7130.00000001',
            dailyVolume: '373576048.37826187',
        },
        {
            id: "3",
            currencyPair: {
                assetCurrency: 'BTC',
                quotableCurrency: 'USDT',
            },
            lastPrice: '7212.479999999',
            dailyChangePercent: '1.91',
            dailyHight: '7686.08999998',
            dailyLow: '7130.00000001',
            dailyVolume: '373576048.37826187',
        },
        {
            id: "4",
            currencyPair: {
                assetCurrency: 'BTC',
                quotableCurrency: 'USDT',
            },
            lastPrice: '7212.479999999',
            dailyChangePercent: '-1.91',
            dailyHight: '7686.08999998',
            dailyLow: '7130.00000001',
            dailyVolume: '373576048.37826187',
        },
        {
            id: "5",
            currencyPair: {
                assetCurrency: 'BTC',
                quotableCurrency: 'USDT',
            },
            lastPrice: '7212.479999999',
            dailyChangePercent: '1.91',
            dailyHight: '7686.08999998',
            dailyLow: '7130.00000001',
            dailyVolume: '373576048.37826187',
        },
        {
            id: "6",
            currencyPair: {
                assetCurrency: 'BTC',
                quotableCurrency: 'USDT',
            },
            lastPrice: '7212.479999999',
            dailyChangePercent: '-1.91',
            dailyHight: '7686.08999998',
            dailyLow: '7130.00000001',
            dailyVolume: '373576048.37826187',
        },
        {
            id: "7",
            currencyPair: {
                assetCurrency: 'BTC',
                quotableCurrency: 'USDT',
            },
            lastPrice: '7212.479999999',
            dailyChangePercent: '1.91',
            dailyHight: '7686.08999998',
            dailyLow: '7130.00000001',
            dailyVolume: '373576048.37826187',
        },
        {
            id: "8",
            currencyPair: {
                assetCurrency: 'BTC',
                quotableCurrency: 'USDT',
            },
            lastPrice: '7212.479999999',
            dailyChangePercent: '-1.91',
            dailyHight: '7686.08999998',
            dailyLow: '7130.00000001',
            dailyVolume: '373576048.37826187',
        },
        {
            id: "9",
            currencyPair: {
                assetCurrency: 'BTC',
                quotableCurrency: 'USDT',
            },
            lastPrice: '7212.479999999',
            dailyChangePercent: '-1.91',
            dailyHight: '7686.08999998',
            dailyLow: '7130.00000001',
            dailyVolume: '373576048.37826187',
        },
        {
            id: "10",
            currencyPair: {
                assetCurrency: 'BTC',
                quotableCurrency: 'USDT',
            },
            lastPrice: '7212.479999999',
            dailyChangePercent: '1.91',
            dailyHight: '7686.08999998',
            dailyLow: '7130.00000001',
            dailyVolume: '373576048.37826187',
        },
    ];

    getAllMarkets() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.markets);
            }, 500);
        });
    }
}

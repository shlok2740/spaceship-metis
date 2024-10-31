import { toNano } from '@ton/core';
import { Games } from '../wrappers/Games';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const games = provider.open(await Games.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await games.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(games.address);

    console.log('ID', await games.getId());
}

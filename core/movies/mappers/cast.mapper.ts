import { Cast } from '@/sync-movies/src/interfaces/cast.interface';

export const mapCastItemToCast = (item: any): Cast => {
    const actor = item?.actors ?? item ?? {};
    return {
        id: Number(actor.id),
        name: actor.name,
        character: item.character_name,
        avatar: actor.avatar_url,
    };
};

export const mapCastItemsToCastArray = (items: any[] = []): Cast[] => {
    return items.map(mapCastItemToCast);
};
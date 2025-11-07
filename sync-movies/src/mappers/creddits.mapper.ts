import { Cast } from "../interfaces/cast.interface";
import { CastInfo } from "../interfaces/credits-response";

export class CredditMapper {
    static fromTheMovieDBToCast = (actor: CastInfo): Cast => {
        return {
            id: actor.id,
            name: actor.name,
            character: actor.character ?? 'No character',
            avatar: actor.profile_path
                ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                : 'https://i.stack.imgur.com/l60Hf.png',
        };
    }
}
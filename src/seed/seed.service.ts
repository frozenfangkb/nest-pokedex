import { Injectable } from '@nestjs/common';
import { PokeAPIResponse } from './interfaces/poke-api-response';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonService.flushPokemons();

    const data = await this.http.get<PokeAPIResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=151',
    );

    const pokemonToInsert: CreatePokemonDto[] = data.results.map((item) => {
      const segments = item.url.split('/');
      const no: number = +segments[segments.length - 2];

      return { ...item, no };
    });

    await this.pokemonService.createMany(pokemonToInsert);

    return {
      status: 200,
      message: 'Database seeded successfully',
    };
  }
}

import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeAPIResponse } from './interfaces/poke-api-response';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(private readonly pokemonService: PokemonService) {}

  async executeSeed() {
    const { data } = await this.axios.get<PokeAPIResponse>(
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

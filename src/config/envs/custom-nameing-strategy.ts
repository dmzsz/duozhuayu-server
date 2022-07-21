import { DefaultNamingStrategy, NamingStrategyInterface, Table } from "typeorm";

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    override primaryKeyName(tableOrName: Table | string, columnNames: string[]) {
      const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
      const columnsSnakeCase = columnNames.join("_");
  
      return `PK_${table}_${columnsSnakeCase}`;
    }
  }
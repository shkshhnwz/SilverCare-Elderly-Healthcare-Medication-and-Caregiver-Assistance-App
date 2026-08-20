
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model CareCircle
 * 
 */
export type CareCircle = $Result.DefaultSelection<Prisma.$CareCirclePayload>
/**
 * Model CareCircleMember
 * 
 */
export type CareCircleMember = $Result.DefaultSelection<Prisma.$CareCircleMemberPayload>
/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model Permission
 * 
 */
export type Permission = $Result.DefaultSelection<Prisma.$PermissionPayload>
/**
 * Model RolePermission
 * 
 */
export type RolePermission = $Result.DefaultSelection<Prisma.$RolePermissionPayload>
/**
 * Model Invitation
 * 
 */
export type Invitation = $Result.DefaultSelection<Prisma.$InvitationPayload>
/**
 * Model Consent
 * 
 */
export type Consent = $Result.DefaultSelection<Prisma.$ConsentPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RoleName: {
  OWNER: 'OWNER',
  CAREGIVER_FULL: 'CAREGIVER_FULL',
  CAREGIVER_VIEW: 'CAREGIVER_VIEW',
  PROFESSIONAL: 'PROFESSIONAL',
  PHYSICIAN: 'PHYSICIAN'
};

export type RoleName = (typeof RoleName)[keyof typeof RoleName]


export const MemberStatus: {
  INVITED: 'INVITED',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  REVOKED: 'REVOKED'
};

export type MemberStatus = (typeof MemberStatus)[keyof typeof MemberStatus]


export const InvitationStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  EXPIRED: 'EXPIRED',
  REVOKED: 'REVOKED'
};

export type InvitationStatus = (typeof InvitationStatus)[keyof typeof InvitationStatus]


export const ConsentStatus: {
  GRANTED: 'GRANTED',
  REVOKED: 'REVOKED',
  EXPIRED: 'EXPIRED'
};

export type ConsentStatus = (typeof ConsentStatus)[keyof typeof ConsentStatus]

}

export type RoleName = $Enums.RoleName

export const RoleName: typeof $Enums.RoleName

export type MemberStatus = $Enums.MemberStatus

export const MemberStatus: typeof $Enums.MemberStatus

export type InvitationStatus = $Enums.InvitationStatus

export const InvitationStatus: typeof $Enums.InvitationStatus

export type ConsentStatus = $Enums.ConsentStatus

export const ConsentStatus: typeof $Enums.ConsentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.careCircle`: Exposes CRUD operations for the **CareCircle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CareCircles
    * const careCircles = await prisma.careCircle.findMany()
    * ```
    */
  get careCircle(): Prisma.CareCircleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.careCircleMember`: Exposes CRUD operations for the **CareCircleMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CareCircleMembers
    * const careCircleMembers = await prisma.careCircleMember.findMany()
    * ```
    */
  get careCircleMember(): Prisma.CareCircleMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.permission`: Exposes CRUD operations for the **Permission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Permissions
    * const permissions = await prisma.permission.findMany()
    * ```
    */
  get permission(): Prisma.PermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rolePermission`: Exposes CRUD operations for the **RolePermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RolePermissions
    * const rolePermissions = await prisma.rolePermission.findMany()
    * ```
    */
  get rolePermission(): Prisma.RolePermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invitation`: Exposes CRUD operations for the **Invitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invitations
    * const invitations = await prisma.invitation.findMany()
    * ```
    */
  get invitation(): Prisma.InvitationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.consent`: Exposes CRUD operations for the **Consent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Consents
    * const consents = await prisma.consent.findMany()
    * ```
    */
  get consent(): Prisma.ConsentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    CareCircle: 'CareCircle',
    CareCircleMember: 'CareCircleMember',
    Role: 'Role',
    Permission: 'Permission',
    RolePermission: 'RolePermission',
    Invitation: 'Invitation',
    Consent: 'Consent',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "careCircle" | "careCircleMember" | "role" | "permission" | "rolePermission" | "invitation" | "consent" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      CareCircle: {
        payload: Prisma.$CareCirclePayload<ExtArgs>
        fields: Prisma.CareCircleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CareCircleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCirclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CareCircleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCirclePayload>
          }
          findFirst: {
            args: Prisma.CareCircleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCirclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CareCircleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCirclePayload>
          }
          findMany: {
            args: Prisma.CareCircleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCirclePayload>[]
          }
          create: {
            args: Prisma.CareCircleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCirclePayload>
          }
          createMany: {
            args: Prisma.CareCircleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CareCircleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCirclePayload>[]
          }
          delete: {
            args: Prisma.CareCircleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCirclePayload>
          }
          update: {
            args: Prisma.CareCircleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCirclePayload>
          }
          deleteMany: {
            args: Prisma.CareCircleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CareCircleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CareCircleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCirclePayload>[]
          }
          upsert: {
            args: Prisma.CareCircleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCirclePayload>
          }
          aggregate: {
            args: Prisma.CareCircleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCareCircle>
          }
          groupBy: {
            args: Prisma.CareCircleGroupByArgs<ExtArgs>
            result: $Utils.Optional<CareCircleGroupByOutputType>[]
          }
          count: {
            args: Prisma.CareCircleCountArgs<ExtArgs>
            result: $Utils.Optional<CareCircleCountAggregateOutputType> | number
          }
        }
      }
      CareCircleMember: {
        payload: Prisma.$CareCircleMemberPayload<ExtArgs>
        fields: Prisma.CareCircleMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CareCircleMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCircleMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CareCircleMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCircleMemberPayload>
          }
          findFirst: {
            args: Prisma.CareCircleMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCircleMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CareCircleMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCircleMemberPayload>
          }
          findMany: {
            args: Prisma.CareCircleMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCircleMemberPayload>[]
          }
          create: {
            args: Prisma.CareCircleMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCircleMemberPayload>
          }
          createMany: {
            args: Prisma.CareCircleMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CareCircleMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCircleMemberPayload>[]
          }
          delete: {
            args: Prisma.CareCircleMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCircleMemberPayload>
          }
          update: {
            args: Prisma.CareCircleMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCircleMemberPayload>
          }
          deleteMany: {
            args: Prisma.CareCircleMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CareCircleMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CareCircleMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCircleMemberPayload>[]
          }
          upsert: {
            args: Prisma.CareCircleMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareCircleMemberPayload>
          }
          aggregate: {
            args: Prisma.CareCircleMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCareCircleMember>
          }
          groupBy: {
            args: Prisma.CareCircleMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<CareCircleMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.CareCircleMemberCountArgs<ExtArgs>
            result: $Utils.Optional<CareCircleMemberCountAggregateOutputType> | number
          }
        }
      }
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      Permission: {
        payload: Prisma.$PermissionPayload<ExtArgs>
        fields: Prisma.PermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          findFirst: {
            args: Prisma.PermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          findMany: {
            args: Prisma.PermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          create: {
            args: Prisma.PermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          createMany: {
            args: Prisma.PermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          delete: {
            args: Prisma.PermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          update: {
            args: Prisma.PermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          deleteMany: {
            args: Prisma.PermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          upsert: {
            args: Prisma.PermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          aggregate: {
            args: Prisma.PermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermission>
          }
          groupBy: {
            args: Prisma.PermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermissionCountArgs<ExtArgs>
            result: $Utils.Optional<PermissionCountAggregateOutputType> | number
          }
        }
      }
      RolePermission: {
        payload: Prisma.$RolePermissionPayload<ExtArgs>
        fields: Prisma.RolePermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolePermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolePermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          findFirst: {
            args: Prisma.RolePermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolePermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          findMany: {
            args: Prisma.RolePermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>[]
          }
          create: {
            args: Prisma.RolePermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          createMany: {
            args: Prisma.RolePermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RolePermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>[]
          }
          delete: {
            args: Prisma.RolePermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          update: {
            args: Prisma.RolePermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          deleteMany: {
            args: Prisma.RolePermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RolePermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RolePermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>[]
          }
          upsert: {
            args: Prisma.RolePermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          aggregate: {
            args: Prisma.RolePermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRolePermission>
          }
          groupBy: {
            args: Prisma.RolePermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolePermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolePermissionCountArgs<ExtArgs>
            result: $Utils.Optional<RolePermissionCountAggregateOutputType> | number
          }
        }
      }
      Invitation: {
        payload: Prisma.$InvitationPayload<ExtArgs>
        fields: Prisma.InvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          findFirst: {
            args: Prisma.InvitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          findMany: {
            args: Prisma.InvitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          create: {
            args: Prisma.InvitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          createMany: {
            args: Prisma.InvitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          delete: {
            args: Prisma.InvitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          update: {
            args: Prisma.InvitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          deleteMany: {
            args: Prisma.InvitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvitationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          upsert: {
            args: Prisma.InvitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          aggregate: {
            args: Prisma.InvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvitation>
          }
          groupBy: {
            args: Prisma.InvitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvitationCountArgs<ExtArgs>
            result: $Utils.Optional<InvitationCountAggregateOutputType> | number
          }
        }
      }
      Consent: {
        payload: Prisma.$ConsentPayload<ExtArgs>
        fields: Prisma.ConsentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConsentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConsentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          findFirst: {
            args: Prisma.ConsentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConsentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          findMany: {
            args: Prisma.ConsentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>[]
          }
          create: {
            args: Prisma.ConsentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          createMany: {
            args: Prisma.ConsentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConsentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>[]
          }
          delete: {
            args: Prisma.ConsentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          update: {
            args: Prisma.ConsentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          deleteMany: {
            args: Prisma.ConsentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConsentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConsentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>[]
          }
          upsert: {
            args: Prisma.ConsentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          aggregate: {
            args: Prisma.ConsentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsent>
          }
          groupBy: {
            args: Prisma.ConsentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConsentCountArgs<ExtArgs>
            result: $Utils.Optional<ConsentCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    careCircle?: CareCircleOmit
    careCircleMember?: CareCircleMemberOmit
    role?: RoleOmit
    permission?: PermissionOmit
    rolePermission?: RolePermissionOmit
    invitation?: InvitationOmit
    consent?: ConsentOmit
    auditLog?: AuditLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    patientCircles: number
    ownedCircles: number
    memberships: number
    sentInvitations: number
    consentsGranted: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patientCircles?: boolean | UserCountOutputTypeCountPatientCirclesArgs
    ownedCircles?: boolean | UserCountOutputTypeCountOwnedCirclesArgs
    memberships?: boolean | UserCountOutputTypeCountMembershipsArgs
    sentInvitations?: boolean | UserCountOutputTypeCountSentInvitationsArgs
    consentsGranted?: boolean | UserCountOutputTypeCountConsentsGrantedArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPatientCirclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareCircleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOwnedCirclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareCircleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareCircleMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConsentsGrantedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type CareCircleCountOutputType
   */

  export type CareCircleCountOutputType = {
    memberships: number
    invitations: number
    consents: number
    auditLogs: number
  }

  export type CareCircleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | CareCircleCountOutputTypeCountMembershipsArgs
    invitations?: boolean | CareCircleCountOutputTypeCountInvitationsArgs
    consents?: boolean | CareCircleCountOutputTypeCountConsentsArgs
    auditLogs?: boolean | CareCircleCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * CareCircleCountOutputType without action
   */
  export type CareCircleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleCountOutputType
     */
    select?: CareCircleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CareCircleCountOutputType without action
   */
  export type CareCircleCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareCircleMemberWhereInput
  }

  /**
   * CareCircleCountOutputType without action
   */
  export type CareCircleCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
  }

  /**
   * CareCircleCountOutputType without action
   */
  export type CareCircleCountOutputTypeCountConsentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsentWhereInput
  }

  /**
   * CareCircleCountOutputType without action
   */
  export type CareCircleCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type CareCircleMemberCountOutputType
   */

  export type CareCircleMemberCountOutputType = {
    consents: number
  }

  export type CareCircleMemberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consents?: boolean | CareCircleMemberCountOutputTypeCountConsentsArgs
  }

  // Custom InputTypes
  /**
   * CareCircleMemberCountOutputType without action
   */
  export type CareCircleMemberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleMemberCountOutputType
     */
    select?: CareCircleMemberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CareCircleMemberCountOutputType without action
   */
  export type CareCircleMemberCountOutputTypeCountConsentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsentWhereInput
  }


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    memberships: number
    rolePermissions: number
    invitations: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | RoleCountOutputTypeCountMembershipsArgs
    rolePermissions?: boolean | RoleCountOutputTypeCountRolePermissionsArgs
    invitations?: boolean | RoleCountOutputTypeCountInvitationsArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareCircleMemberWhereInput
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountRolePermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissionWhereInput
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
  }


  /**
   * Count Type PermissionCountOutputType
   */

  export type PermissionCountOutputType = {
    rolePermissions: number
  }

  export type PermissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rolePermissions?: boolean | PermissionCountOutputTypeCountRolePermissionsArgs
  }

  // Custom InputTypes
  /**
   * PermissionCountOutputType without action
   */
  export type PermissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionCountOutputType
     */
    select?: PermissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PermissionCountOutputType without action
   */
  export type PermissionCountOutputTypeCountRolePermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    phone: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    email: string | null
    phone: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientCircles?: boolean | User$patientCirclesArgs<ExtArgs>
    ownedCircles?: boolean | User$ownedCirclesArgs<ExtArgs>
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    sentInvitations?: boolean | User$sentInvitationsArgs<ExtArgs>
    consentsGranted?: boolean | User$consentsGrantedArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "phone" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patientCircles?: boolean | User$patientCirclesArgs<ExtArgs>
    ownedCircles?: boolean | User$ownedCirclesArgs<ExtArgs>
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    sentInvitations?: boolean | User$sentInvitationsArgs<ExtArgs>
    consentsGranted?: boolean | User$consentsGrantedArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      patientCircles: Prisma.$CareCirclePayload<ExtArgs>[]
      ownedCircles: Prisma.$CareCirclePayload<ExtArgs>[]
      memberships: Prisma.$CareCircleMemberPayload<ExtArgs>[]
      sentInvitations: Prisma.$InvitationPayload<ExtArgs>[]
      consentsGranted: Prisma.$ConsentPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      email: string | null
      phone: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patientCircles<T extends User$patientCirclesArgs<ExtArgs> = {}>(args?: Subset<T, User$patientCirclesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ownedCircles<T extends User$ownedCirclesArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedCirclesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    memberships<T extends User$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareCircleMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentInvitations<T extends User$sentInvitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$sentInvitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    consentsGranted<T extends User$consentsGrantedArgs<ExtArgs> = {}>(args?: Subset<T, User$consentsGrantedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.patientCircles
   */
  export type User$patientCirclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircle
     */
    select?: CareCircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircle
     */
    omit?: CareCircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleInclude<ExtArgs> | null
    where?: CareCircleWhereInput
    orderBy?: CareCircleOrderByWithRelationInput | CareCircleOrderByWithRelationInput[]
    cursor?: CareCircleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CareCircleScalarFieldEnum | CareCircleScalarFieldEnum[]
  }

  /**
   * User.ownedCircles
   */
  export type User$ownedCirclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircle
     */
    select?: CareCircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircle
     */
    omit?: CareCircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleInclude<ExtArgs> | null
    where?: CareCircleWhereInput
    orderBy?: CareCircleOrderByWithRelationInput | CareCircleOrderByWithRelationInput[]
    cursor?: CareCircleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CareCircleScalarFieldEnum | CareCircleScalarFieldEnum[]
  }

  /**
   * User.memberships
   */
  export type User$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleMember
     */
    select?: CareCircleMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircleMember
     */
    omit?: CareCircleMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleMemberInclude<ExtArgs> | null
    where?: CareCircleMemberWhereInput
    orderBy?: CareCircleMemberOrderByWithRelationInput | CareCircleMemberOrderByWithRelationInput[]
    cursor?: CareCircleMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CareCircleMemberScalarFieldEnum | CareCircleMemberScalarFieldEnum[]
  }

  /**
   * User.sentInvitations
   */
  export type User$sentInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    cursor?: InvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * User.consentsGranted
   */
  export type User$consentsGrantedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    where?: ConsentWhereInput
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    cursor?: ConsentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model CareCircle
   */

  export type AggregateCareCircle = {
    _count: CareCircleCountAggregateOutputType | null
    _min: CareCircleMinAggregateOutputType | null
    _max: CareCircleMaxAggregateOutputType | null
  }

  export type CareCircleMinAggregateOutputType = {
    id: string | null
    name: string | null
    patientId: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CareCircleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    patientId: string | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CareCircleCountAggregateOutputType = {
    id: number
    name: number
    patientId: number
    ownerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CareCircleMinAggregateInputType = {
    id?: true
    name?: true
    patientId?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CareCircleMaxAggregateInputType = {
    id?: true
    name?: true
    patientId?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CareCircleCountAggregateInputType = {
    id?: true
    name?: true
    patientId?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CareCircleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareCircle to aggregate.
     */
    where?: CareCircleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareCircles to fetch.
     */
    orderBy?: CareCircleOrderByWithRelationInput | CareCircleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CareCircleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareCircles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareCircles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CareCircles
    **/
    _count?: true | CareCircleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CareCircleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CareCircleMaxAggregateInputType
  }

  export type GetCareCircleAggregateType<T extends CareCircleAggregateArgs> = {
        [P in keyof T & keyof AggregateCareCircle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCareCircle[P]>
      : GetScalarType<T[P], AggregateCareCircle[P]>
  }




  export type CareCircleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareCircleWhereInput
    orderBy?: CareCircleOrderByWithAggregationInput | CareCircleOrderByWithAggregationInput[]
    by: CareCircleScalarFieldEnum[] | CareCircleScalarFieldEnum
    having?: CareCircleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CareCircleCountAggregateInputType | true
    _min?: CareCircleMinAggregateInputType
    _max?: CareCircleMaxAggregateInputType
  }

  export type CareCircleGroupByOutputType = {
    id: string
    name: string
    patientId: string
    ownerId: string
    createdAt: Date
    updatedAt: Date
    _count: CareCircleCountAggregateOutputType | null
    _min: CareCircleMinAggregateOutputType | null
    _max: CareCircleMaxAggregateOutputType | null
  }

  type GetCareCircleGroupByPayload<T extends CareCircleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CareCircleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CareCircleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CareCircleGroupByOutputType[P]>
            : GetScalarType<T[P], CareCircleGroupByOutputType[P]>
        }
      >
    >


  export type CareCircleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    patientId?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | UserDefaultArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
    memberships?: boolean | CareCircle$membershipsArgs<ExtArgs>
    invitations?: boolean | CareCircle$invitationsArgs<ExtArgs>
    consents?: boolean | CareCircle$consentsArgs<ExtArgs>
    auditLogs?: boolean | CareCircle$auditLogsArgs<ExtArgs>
    _count?: boolean | CareCircleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careCircle"]>

  export type CareCircleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    patientId?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | UserDefaultArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careCircle"]>

  export type CareCircleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    patientId?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | UserDefaultArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careCircle"]>

  export type CareCircleSelectScalar = {
    id?: boolean
    name?: boolean
    patientId?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CareCircleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "patientId" | "ownerId" | "createdAt" | "updatedAt", ExtArgs["result"]["careCircle"]>
  export type CareCircleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | UserDefaultArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
    memberships?: boolean | CareCircle$membershipsArgs<ExtArgs>
    invitations?: boolean | CareCircle$invitationsArgs<ExtArgs>
    consents?: boolean | CareCircle$consentsArgs<ExtArgs>
    auditLogs?: boolean | CareCircle$auditLogsArgs<ExtArgs>
    _count?: boolean | CareCircleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CareCircleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | UserDefaultArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CareCircleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | UserDefaultArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CareCirclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CareCircle"
    objects: {
      patient: Prisma.$UserPayload<ExtArgs>
      owner: Prisma.$UserPayload<ExtArgs>
      memberships: Prisma.$CareCircleMemberPayload<ExtArgs>[]
      invitations: Prisma.$InvitationPayload<ExtArgs>[]
      consents: Prisma.$ConsentPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      patientId: string
      ownerId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["careCircle"]>
    composites: {}
  }

  type CareCircleGetPayload<S extends boolean | null | undefined | CareCircleDefaultArgs> = $Result.GetResult<Prisma.$CareCirclePayload, S>

  type CareCircleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CareCircleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CareCircleCountAggregateInputType | true
    }

  export interface CareCircleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CareCircle'], meta: { name: 'CareCircle' } }
    /**
     * Find zero or one CareCircle that matches the filter.
     * @param {CareCircleFindUniqueArgs} args - Arguments to find a CareCircle
     * @example
     * // Get one CareCircle
     * const careCircle = await prisma.careCircle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CareCircleFindUniqueArgs>(args: SelectSubset<T, CareCircleFindUniqueArgs<ExtArgs>>): Prisma__CareCircleClient<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CareCircle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CareCircleFindUniqueOrThrowArgs} args - Arguments to find a CareCircle
     * @example
     * // Get one CareCircle
     * const careCircle = await prisma.careCircle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CareCircleFindUniqueOrThrowArgs>(args: SelectSubset<T, CareCircleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CareCircleClient<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CareCircle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareCircleFindFirstArgs} args - Arguments to find a CareCircle
     * @example
     * // Get one CareCircle
     * const careCircle = await prisma.careCircle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CareCircleFindFirstArgs>(args?: SelectSubset<T, CareCircleFindFirstArgs<ExtArgs>>): Prisma__CareCircleClient<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CareCircle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareCircleFindFirstOrThrowArgs} args - Arguments to find a CareCircle
     * @example
     * // Get one CareCircle
     * const careCircle = await prisma.careCircle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CareCircleFindFirstOrThrowArgs>(args?: SelectSubset<T, CareCircleFindFirstOrThrowArgs<ExtArgs>>): Prisma__CareCircleClient<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CareCircles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareCircleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CareCircles
     * const careCircles = await prisma.careCircle.findMany()
     * 
     * // Get first 10 CareCircles
     * const careCircles = await prisma.careCircle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const careCircleWithIdOnly = await prisma.careCircle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CareCircleFindManyArgs>(args?: SelectSubset<T, CareCircleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CareCircle.
     * @param {CareCircleCreateArgs} args - Arguments to create a CareCircle.
     * @example
     * // Create one CareCircle
     * const CareCircle = await prisma.careCircle.create({
     *   data: {
     *     // ... data to create a CareCircle
     *   }
     * })
     * 
     */
    create<T extends CareCircleCreateArgs>(args: SelectSubset<T, CareCircleCreateArgs<ExtArgs>>): Prisma__CareCircleClient<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CareCircles.
     * @param {CareCircleCreateManyArgs} args - Arguments to create many CareCircles.
     * @example
     * // Create many CareCircles
     * const careCircle = await prisma.careCircle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CareCircleCreateManyArgs>(args?: SelectSubset<T, CareCircleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CareCircles and returns the data saved in the database.
     * @param {CareCircleCreateManyAndReturnArgs} args - Arguments to create many CareCircles.
     * @example
     * // Create many CareCircles
     * const careCircle = await prisma.careCircle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CareCircles and only return the `id`
     * const careCircleWithIdOnly = await prisma.careCircle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CareCircleCreateManyAndReturnArgs>(args?: SelectSubset<T, CareCircleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CareCircle.
     * @param {CareCircleDeleteArgs} args - Arguments to delete one CareCircle.
     * @example
     * // Delete one CareCircle
     * const CareCircle = await prisma.careCircle.delete({
     *   where: {
     *     // ... filter to delete one CareCircle
     *   }
     * })
     * 
     */
    delete<T extends CareCircleDeleteArgs>(args: SelectSubset<T, CareCircleDeleteArgs<ExtArgs>>): Prisma__CareCircleClient<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CareCircle.
     * @param {CareCircleUpdateArgs} args - Arguments to update one CareCircle.
     * @example
     * // Update one CareCircle
     * const careCircle = await prisma.careCircle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CareCircleUpdateArgs>(args: SelectSubset<T, CareCircleUpdateArgs<ExtArgs>>): Prisma__CareCircleClient<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CareCircles.
     * @param {CareCircleDeleteManyArgs} args - Arguments to filter CareCircles to delete.
     * @example
     * // Delete a few CareCircles
     * const { count } = await prisma.careCircle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CareCircleDeleteManyArgs>(args?: SelectSubset<T, CareCircleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CareCircles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareCircleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CareCircles
     * const careCircle = await prisma.careCircle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CareCircleUpdateManyArgs>(args: SelectSubset<T, CareCircleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CareCircles and returns the data updated in the database.
     * @param {CareCircleUpdateManyAndReturnArgs} args - Arguments to update many CareCircles.
     * @example
     * // Update many CareCircles
     * const careCircle = await prisma.careCircle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CareCircles and only return the `id`
     * const careCircleWithIdOnly = await prisma.careCircle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CareCircleUpdateManyAndReturnArgs>(args: SelectSubset<T, CareCircleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CareCircle.
     * @param {CareCircleUpsertArgs} args - Arguments to update or create a CareCircle.
     * @example
     * // Update or create a CareCircle
     * const careCircle = await prisma.careCircle.upsert({
     *   create: {
     *     // ... data to create a CareCircle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CareCircle we want to update
     *   }
     * })
     */
    upsert<T extends CareCircleUpsertArgs>(args: SelectSubset<T, CareCircleUpsertArgs<ExtArgs>>): Prisma__CareCircleClient<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CareCircles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareCircleCountArgs} args - Arguments to filter CareCircles to count.
     * @example
     * // Count the number of CareCircles
     * const count = await prisma.careCircle.count({
     *   where: {
     *     // ... the filter for the CareCircles we want to count
     *   }
     * })
    **/
    count<T extends CareCircleCountArgs>(
      args?: Subset<T, CareCircleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CareCircleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CareCircle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareCircleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CareCircleAggregateArgs>(args: Subset<T, CareCircleAggregateArgs>): Prisma.PrismaPromise<GetCareCircleAggregateType<T>>

    /**
     * Group by CareCircle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareCircleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CareCircleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CareCircleGroupByArgs['orderBy'] }
        : { orderBy?: CareCircleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CareCircleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCareCircleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CareCircle model
   */
  readonly fields: CareCircleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CareCircle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CareCircleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    memberships<T extends CareCircle$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, CareCircle$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareCircleMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invitations<T extends CareCircle$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, CareCircle$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    consents<T extends CareCircle$consentsArgs<ExtArgs> = {}>(args?: Subset<T, CareCircle$consentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends CareCircle$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, CareCircle$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CareCircle model
   */
  interface CareCircleFieldRefs {
    readonly id: FieldRef<"CareCircle", 'String'>
    readonly name: FieldRef<"CareCircle", 'String'>
    readonly patientId: FieldRef<"CareCircle", 'String'>
    readonly ownerId: FieldRef<"CareCircle", 'String'>
    readonly createdAt: FieldRef<"CareCircle", 'DateTime'>
    readonly updatedAt: FieldRef<"CareCircle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CareCircle findUnique
   */
  export type CareCircleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircle
     */
    select?: CareCircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircle
     */
    omit?: CareCircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleInclude<ExtArgs> | null
    /**
     * Filter, which CareCircle to fetch.
     */
    where: CareCircleWhereUniqueInput
  }

  /**
   * CareCircle findUniqueOrThrow
   */
  export type CareCircleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircle
     */
    select?: CareCircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircle
     */
    omit?: CareCircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleInclude<ExtArgs> | null
    /**
     * Filter, which CareCircle to fetch.
     */
    where: CareCircleWhereUniqueInput
  }

  /**
   * CareCircle findFirst
   */
  export type CareCircleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircle
     */
    select?: CareCircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircle
     */
    omit?: CareCircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleInclude<ExtArgs> | null
    /**
     * Filter, which CareCircle to fetch.
     */
    where?: CareCircleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareCircles to fetch.
     */
    orderBy?: CareCircleOrderByWithRelationInput | CareCircleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareCircles.
     */
    cursor?: CareCircleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareCircles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareCircles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareCircles.
     */
    distinct?: CareCircleScalarFieldEnum | CareCircleScalarFieldEnum[]
  }

  /**
   * CareCircle findFirstOrThrow
   */
  export type CareCircleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircle
     */
    select?: CareCircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircle
     */
    omit?: CareCircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleInclude<ExtArgs> | null
    /**
     * Filter, which CareCircle to fetch.
     */
    where?: CareCircleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareCircles to fetch.
     */
    orderBy?: CareCircleOrderByWithRelationInput | CareCircleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareCircles.
     */
    cursor?: CareCircleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareCircles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareCircles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareCircles.
     */
    distinct?: CareCircleScalarFieldEnum | CareCircleScalarFieldEnum[]
  }

  /**
   * CareCircle findMany
   */
  export type CareCircleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircle
     */
    select?: CareCircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircle
     */
    omit?: CareCircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleInclude<ExtArgs> | null
    /**
     * Filter, which CareCircles to fetch.
     */
    where?: CareCircleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareCircles to fetch.
     */
    orderBy?: CareCircleOrderByWithRelationInput | CareCircleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CareCircles.
     */
    cursor?: CareCircleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareCircles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareCircles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareCircles.
     */
    distinct?: CareCircleScalarFieldEnum | CareCircleScalarFieldEnum[]
  }

  /**
   * CareCircle create
   */
  export type CareCircleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircle
     */
    select?: CareCircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircle
     */
    omit?: CareCircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleInclude<ExtArgs> | null
    /**
     * The data needed to create a CareCircle.
     */
    data: XOR<CareCircleCreateInput, CareCircleUncheckedCreateInput>
  }

  /**
   * CareCircle createMany
   */
  export type CareCircleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CareCircles.
     */
    data: CareCircleCreateManyInput | CareCircleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CareCircle createManyAndReturn
   */
  export type CareCircleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircle
     */
    select?: CareCircleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircle
     */
    omit?: CareCircleOmit<ExtArgs> | null
    /**
     * The data used to create many CareCircles.
     */
    data: CareCircleCreateManyInput | CareCircleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CareCircle update
   */
  export type CareCircleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircle
     */
    select?: CareCircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircle
     */
    omit?: CareCircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleInclude<ExtArgs> | null
    /**
     * The data needed to update a CareCircle.
     */
    data: XOR<CareCircleUpdateInput, CareCircleUncheckedUpdateInput>
    /**
     * Choose, which CareCircle to update.
     */
    where: CareCircleWhereUniqueInput
  }

  /**
   * CareCircle updateMany
   */
  export type CareCircleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CareCircles.
     */
    data: XOR<CareCircleUpdateManyMutationInput, CareCircleUncheckedUpdateManyInput>
    /**
     * Filter which CareCircles to update
     */
    where?: CareCircleWhereInput
    /**
     * Limit how many CareCircles to update.
     */
    limit?: number
  }

  /**
   * CareCircle updateManyAndReturn
   */
  export type CareCircleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircle
     */
    select?: CareCircleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircle
     */
    omit?: CareCircleOmit<ExtArgs> | null
    /**
     * The data used to update CareCircles.
     */
    data: XOR<CareCircleUpdateManyMutationInput, CareCircleUncheckedUpdateManyInput>
    /**
     * Filter which CareCircles to update
     */
    where?: CareCircleWhereInput
    /**
     * Limit how many CareCircles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CareCircle upsert
   */
  export type CareCircleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircle
     */
    select?: CareCircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircle
     */
    omit?: CareCircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleInclude<ExtArgs> | null
    /**
     * The filter to search for the CareCircle to update in case it exists.
     */
    where: CareCircleWhereUniqueInput
    /**
     * In case the CareCircle found by the `where` argument doesn't exist, create a new CareCircle with this data.
     */
    create: XOR<CareCircleCreateInput, CareCircleUncheckedCreateInput>
    /**
     * In case the CareCircle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CareCircleUpdateInput, CareCircleUncheckedUpdateInput>
  }

  /**
   * CareCircle delete
   */
  export type CareCircleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircle
     */
    select?: CareCircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircle
     */
    omit?: CareCircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleInclude<ExtArgs> | null
    /**
     * Filter which CareCircle to delete.
     */
    where: CareCircleWhereUniqueInput
  }

  /**
   * CareCircle deleteMany
   */
  export type CareCircleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareCircles to delete
     */
    where?: CareCircleWhereInput
    /**
     * Limit how many CareCircles to delete.
     */
    limit?: number
  }

  /**
   * CareCircle.memberships
   */
  export type CareCircle$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleMember
     */
    select?: CareCircleMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircleMember
     */
    omit?: CareCircleMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleMemberInclude<ExtArgs> | null
    where?: CareCircleMemberWhereInput
    orderBy?: CareCircleMemberOrderByWithRelationInput | CareCircleMemberOrderByWithRelationInput[]
    cursor?: CareCircleMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CareCircleMemberScalarFieldEnum | CareCircleMemberScalarFieldEnum[]
  }

  /**
   * CareCircle.invitations
   */
  export type CareCircle$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    cursor?: InvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * CareCircle.consents
   */
  export type CareCircle$consentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    where?: ConsentWhereInput
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    cursor?: ConsentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * CareCircle.auditLogs
   */
  export type CareCircle$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * CareCircle without action
   */
  export type CareCircleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircle
     */
    select?: CareCircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircle
     */
    omit?: CareCircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleInclude<ExtArgs> | null
  }


  /**
   * Model CareCircleMember
   */

  export type AggregateCareCircleMember = {
    _count: CareCircleMemberCountAggregateOutputType | null
    _min: CareCircleMemberMinAggregateOutputType | null
    _max: CareCircleMemberMaxAggregateOutputType | null
  }

  export type CareCircleMemberMinAggregateOutputType = {
    id: string | null
    circleId: string | null
    userId: string | null
    roleId: string | null
    status: $Enums.MemberStatus | null
    joinedAt: Date | null
    revokedAt: Date | null
  }

  export type CareCircleMemberMaxAggregateOutputType = {
    id: string | null
    circleId: string | null
    userId: string | null
    roleId: string | null
    status: $Enums.MemberStatus | null
    joinedAt: Date | null
    revokedAt: Date | null
  }

  export type CareCircleMemberCountAggregateOutputType = {
    id: number
    circleId: number
    userId: number
    roleId: number
    status: number
    joinedAt: number
    revokedAt: number
    _all: number
  }


  export type CareCircleMemberMinAggregateInputType = {
    id?: true
    circleId?: true
    userId?: true
    roleId?: true
    status?: true
    joinedAt?: true
    revokedAt?: true
  }

  export type CareCircleMemberMaxAggregateInputType = {
    id?: true
    circleId?: true
    userId?: true
    roleId?: true
    status?: true
    joinedAt?: true
    revokedAt?: true
  }

  export type CareCircleMemberCountAggregateInputType = {
    id?: true
    circleId?: true
    userId?: true
    roleId?: true
    status?: true
    joinedAt?: true
    revokedAt?: true
    _all?: true
  }

  export type CareCircleMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareCircleMember to aggregate.
     */
    where?: CareCircleMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareCircleMembers to fetch.
     */
    orderBy?: CareCircleMemberOrderByWithRelationInput | CareCircleMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CareCircleMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareCircleMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareCircleMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CareCircleMembers
    **/
    _count?: true | CareCircleMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CareCircleMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CareCircleMemberMaxAggregateInputType
  }

  export type GetCareCircleMemberAggregateType<T extends CareCircleMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateCareCircleMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCareCircleMember[P]>
      : GetScalarType<T[P], AggregateCareCircleMember[P]>
  }




  export type CareCircleMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareCircleMemberWhereInput
    orderBy?: CareCircleMemberOrderByWithAggregationInput | CareCircleMemberOrderByWithAggregationInput[]
    by: CareCircleMemberScalarFieldEnum[] | CareCircleMemberScalarFieldEnum
    having?: CareCircleMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CareCircleMemberCountAggregateInputType | true
    _min?: CareCircleMemberMinAggregateInputType
    _max?: CareCircleMemberMaxAggregateInputType
  }

  export type CareCircleMemberGroupByOutputType = {
    id: string
    circleId: string
    userId: string
    roleId: string
    status: $Enums.MemberStatus
    joinedAt: Date
    revokedAt: Date | null
    _count: CareCircleMemberCountAggregateOutputType | null
    _min: CareCircleMemberMinAggregateOutputType | null
    _max: CareCircleMemberMaxAggregateOutputType | null
  }

  type GetCareCircleMemberGroupByPayload<T extends CareCircleMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CareCircleMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CareCircleMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CareCircleMemberGroupByOutputType[P]>
            : GetScalarType<T[P], CareCircleMemberGroupByOutputType[P]>
        }
      >
    >


  export type CareCircleMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    circleId?: boolean
    userId?: boolean
    roleId?: boolean
    status?: boolean
    joinedAt?: boolean
    revokedAt?: boolean
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
    consents?: boolean | CareCircleMember$consentsArgs<ExtArgs>
    _count?: boolean | CareCircleMemberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careCircleMember"]>

  export type CareCircleMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    circleId?: boolean
    userId?: boolean
    roleId?: boolean
    status?: boolean
    joinedAt?: boolean
    revokedAt?: boolean
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careCircleMember"]>

  export type CareCircleMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    circleId?: boolean
    userId?: boolean
    roleId?: boolean
    status?: boolean
    joinedAt?: boolean
    revokedAt?: boolean
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careCircleMember"]>

  export type CareCircleMemberSelectScalar = {
    id?: boolean
    circleId?: boolean
    userId?: boolean
    roleId?: boolean
    status?: boolean
    joinedAt?: boolean
    revokedAt?: boolean
  }

  export type CareCircleMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "circleId" | "userId" | "roleId" | "status" | "joinedAt" | "revokedAt", ExtArgs["result"]["careCircleMember"]>
  export type CareCircleMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
    consents?: boolean | CareCircleMember$consentsArgs<ExtArgs>
    _count?: boolean | CareCircleMemberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CareCircleMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }
  export type CareCircleMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }

  export type $CareCircleMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CareCircleMember"
    objects: {
      circle: Prisma.$CareCirclePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      role: Prisma.$RolePayload<ExtArgs>
      consents: Prisma.$ConsentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      circleId: string
      userId: string
      roleId: string
      status: $Enums.MemberStatus
      joinedAt: Date
      revokedAt: Date | null
    }, ExtArgs["result"]["careCircleMember"]>
    composites: {}
  }

  type CareCircleMemberGetPayload<S extends boolean | null | undefined | CareCircleMemberDefaultArgs> = $Result.GetResult<Prisma.$CareCircleMemberPayload, S>

  type CareCircleMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CareCircleMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CareCircleMemberCountAggregateInputType | true
    }

  export interface CareCircleMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CareCircleMember'], meta: { name: 'CareCircleMember' } }
    /**
     * Find zero or one CareCircleMember that matches the filter.
     * @param {CareCircleMemberFindUniqueArgs} args - Arguments to find a CareCircleMember
     * @example
     * // Get one CareCircleMember
     * const careCircleMember = await prisma.careCircleMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CareCircleMemberFindUniqueArgs>(args: SelectSubset<T, CareCircleMemberFindUniqueArgs<ExtArgs>>): Prisma__CareCircleMemberClient<$Result.GetResult<Prisma.$CareCircleMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CareCircleMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CareCircleMemberFindUniqueOrThrowArgs} args - Arguments to find a CareCircleMember
     * @example
     * // Get one CareCircleMember
     * const careCircleMember = await prisma.careCircleMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CareCircleMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, CareCircleMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CareCircleMemberClient<$Result.GetResult<Prisma.$CareCircleMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CareCircleMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareCircleMemberFindFirstArgs} args - Arguments to find a CareCircleMember
     * @example
     * // Get one CareCircleMember
     * const careCircleMember = await prisma.careCircleMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CareCircleMemberFindFirstArgs>(args?: SelectSubset<T, CareCircleMemberFindFirstArgs<ExtArgs>>): Prisma__CareCircleMemberClient<$Result.GetResult<Prisma.$CareCircleMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CareCircleMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareCircleMemberFindFirstOrThrowArgs} args - Arguments to find a CareCircleMember
     * @example
     * // Get one CareCircleMember
     * const careCircleMember = await prisma.careCircleMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CareCircleMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, CareCircleMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__CareCircleMemberClient<$Result.GetResult<Prisma.$CareCircleMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CareCircleMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareCircleMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CareCircleMembers
     * const careCircleMembers = await prisma.careCircleMember.findMany()
     * 
     * // Get first 10 CareCircleMembers
     * const careCircleMembers = await prisma.careCircleMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const careCircleMemberWithIdOnly = await prisma.careCircleMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CareCircleMemberFindManyArgs>(args?: SelectSubset<T, CareCircleMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareCircleMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CareCircleMember.
     * @param {CareCircleMemberCreateArgs} args - Arguments to create a CareCircleMember.
     * @example
     * // Create one CareCircleMember
     * const CareCircleMember = await prisma.careCircleMember.create({
     *   data: {
     *     // ... data to create a CareCircleMember
     *   }
     * })
     * 
     */
    create<T extends CareCircleMemberCreateArgs>(args: SelectSubset<T, CareCircleMemberCreateArgs<ExtArgs>>): Prisma__CareCircleMemberClient<$Result.GetResult<Prisma.$CareCircleMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CareCircleMembers.
     * @param {CareCircleMemberCreateManyArgs} args - Arguments to create many CareCircleMembers.
     * @example
     * // Create many CareCircleMembers
     * const careCircleMember = await prisma.careCircleMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CareCircleMemberCreateManyArgs>(args?: SelectSubset<T, CareCircleMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CareCircleMembers and returns the data saved in the database.
     * @param {CareCircleMemberCreateManyAndReturnArgs} args - Arguments to create many CareCircleMembers.
     * @example
     * // Create many CareCircleMembers
     * const careCircleMember = await prisma.careCircleMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CareCircleMembers and only return the `id`
     * const careCircleMemberWithIdOnly = await prisma.careCircleMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CareCircleMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, CareCircleMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareCircleMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CareCircleMember.
     * @param {CareCircleMemberDeleteArgs} args - Arguments to delete one CareCircleMember.
     * @example
     * // Delete one CareCircleMember
     * const CareCircleMember = await prisma.careCircleMember.delete({
     *   where: {
     *     // ... filter to delete one CareCircleMember
     *   }
     * })
     * 
     */
    delete<T extends CareCircleMemberDeleteArgs>(args: SelectSubset<T, CareCircleMemberDeleteArgs<ExtArgs>>): Prisma__CareCircleMemberClient<$Result.GetResult<Prisma.$CareCircleMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CareCircleMember.
     * @param {CareCircleMemberUpdateArgs} args - Arguments to update one CareCircleMember.
     * @example
     * // Update one CareCircleMember
     * const careCircleMember = await prisma.careCircleMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CareCircleMemberUpdateArgs>(args: SelectSubset<T, CareCircleMemberUpdateArgs<ExtArgs>>): Prisma__CareCircleMemberClient<$Result.GetResult<Prisma.$CareCircleMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CareCircleMembers.
     * @param {CareCircleMemberDeleteManyArgs} args - Arguments to filter CareCircleMembers to delete.
     * @example
     * // Delete a few CareCircleMembers
     * const { count } = await prisma.careCircleMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CareCircleMemberDeleteManyArgs>(args?: SelectSubset<T, CareCircleMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CareCircleMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareCircleMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CareCircleMembers
     * const careCircleMember = await prisma.careCircleMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CareCircleMemberUpdateManyArgs>(args: SelectSubset<T, CareCircleMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CareCircleMembers and returns the data updated in the database.
     * @param {CareCircleMemberUpdateManyAndReturnArgs} args - Arguments to update many CareCircleMembers.
     * @example
     * // Update many CareCircleMembers
     * const careCircleMember = await prisma.careCircleMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CareCircleMembers and only return the `id`
     * const careCircleMemberWithIdOnly = await prisma.careCircleMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CareCircleMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, CareCircleMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareCircleMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CareCircleMember.
     * @param {CareCircleMemberUpsertArgs} args - Arguments to update or create a CareCircleMember.
     * @example
     * // Update or create a CareCircleMember
     * const careCircleMember = await prisma.careCircleMember.upsert({
     *   create: {
     *     // ... data to create a CareCircleMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CareCircleMember we want to update
     *   }
     * })
     */
    upsert<T extends CareCircleMemberUpsertArgs>(args: SelectSubset<T, CareCircleMemberUpsertArgs<ExtArgs>>): Prisma__CareCircleMemberClient<$Result.GetResult<Prisma.$CareCircleMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CareCircleMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareCircleMemberCountArgs} args - Arguments to filter CareCircleMembers to count.
     * @example
     * // Count the number of CareCircleMembers
     * const count = await prisma.careCircleMember.count({
     *   where: {
     *     // ... the filter for the CareCircleMembers we want to count
     *   }
     * })
    **/
    count<T extends CareCircleMemberCountArgs>(
      args?: Subset<T, CareCircleMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CareCircleMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CareCircleMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareCircleMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CareCircleMemberAggregateArgs>(args: Subset<T, CareCircleMemberAggregateArgs>): Prisma.PrismaPromise<GetCareCircleMemberAggregateType<T>>

    /**
     * Group by CareCircleMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareCircleMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CareCircleMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CareCircleMemberGroupByArgs['orderBy'] }
        : { orderBy?: CareCircleMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CareCircleMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCareCircleMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CareCircleMember model
   */
  readonly fields: CareCircleMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CareCircleMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CareCircleMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    circle<T extends CareCircleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CareCircleDefaultArgs<ExtArgs>>): Prisma__CareCircleClient<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    consents<T extends CareCircleMember$consentsArgs<ExtArgs> = {}>(args?: Subset<T, CareCircleMember$consentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CareCircleMember model
   */
  interface CareCircleMemberFieldRefs {
    readonly id: FieldRef<"CareCircleMember", 'String'>
    readonly circleId: FieldRef<"CareCircleMember", 'String'>
    readonly userId: FieldRef<"CareCircleMember", 'String'>
    readonly roleId: FieldRef<"CareCircleMember", 'String'>
    readonly status: FieldRef<"CareCircleMember", 'MemberStatus'>
    readonly joinedAt: FieldRef<"CareCircleMember", 'DateTime'>
    readonly revokedAt: FieldRef<"CareCircleMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CareCircleMember findUnique
   */
  export type CareCircleMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleMember
     */
    select?: CareCircleMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircleMember
     */
    omit?: CareCircleMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleMemberInclude<ExtArgs> | null
    /**
     * Filter, which CareCircleMember to fetch.
     */
    where: CareCircleMemberWhereUniqueInput
  }

  /**
   * CareCircleMember findUniqueOrThrow
   */
  export type CareCircleMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleMember
     */
    select?: CareCircleMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircleMember
     */
    omit?: CareCircleMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleMemberInclude<ExtArgs> | null
    /**
     * Filter, which CareCircleMember to fetch.
     */
    where: CareCircleMemberWhereUniqueInput
  }

  /**
   * CareCircleMember findFirst
   */
  export type CareCircleMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleMember
     */
    select?: CareCircleMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircleMember
     */
    omit?: CareCircleMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleMemberInclude<ExtArgs> | null
    /**
     * Filter, which CareCircleMember to fetch.
     */
    where?: CareCircleMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareCircleMembers to fetch.
     */
    orderBy?: CareCircleMemberOrderByWithRelationInput | CareCircleMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareCircleMembers.
     */
    cursor?: CareCircleMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareCircleMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareCircleMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareCircleMembers.
     */
    distinct?: CareCircleMemberScalarFieldEnum | CareCircleMemberScalarFieldEnum[]
  }

  /**
   * CareCircleMember findFirstOrThrow
   */
  export type CareCircleMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleMember
     */
    select?: CareCircleMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircleMember
     */
    omit?: CareCircleMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleMemberInclude<ExtArgs> | null
    /**
     * Filter, which CareCircleMember to fetch.
     */
    where?: CareCircleMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareCircleMembers to fetch.
     */
    orderBy?: CareCircleMemberOrderByWithRelationInput | CareCircleMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareCircleMembers.
     */
    cursor?: CareCircleMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareCircleMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareCircleMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareCircleMembers.
     */
    distinct?: CareCircleMemberScalarFieldEnum | CareCircleMemberScalarFieldEnum[]
  }

  /**
   * CareCircleMember findMany
   */
  export type CareCircleMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleMember
     */
    select?: CareCircleMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircleMember
     */
    omit?: CareCircleMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleMemberInclude<ExtArgs> | null
    /**
     * Filter, which CareCircleMembers to fetch.
     */
    where?: CareCircleMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareCircleMembers to fetch.
     */
    orderBy?: CareCircleMemberOrderByWithRelationInput | CareCircleMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CareCircleMembers.
     */
    cursor?: CareCircleMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareCircleMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareCircleMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareCircleMembers.
     */
    distinct?: CareCircleMemberScalarFieldEnum | CareCircleMemberScalarFieldEnum[]
  }

  /**
   * CareCircleMember create
   */
  export type CareCircleMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleMember
     */
    select?: CareCircleMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircleMember
     */
    omit?: CareCircleMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a CareCircleMember.
     */
    data: XOR<CareCircleMemberCreateInput, CareCircleMemberUncheckedCreateInput>
  }

  /**
   * CareCircleMember createMany
   */
  export type CareCircleMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CareCircleMembers.
     */
    data: CareCircleMemberCreateManyInput | CareCircleMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CareCircleMember createManyAndReturn
   */
  export type CareCircleMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleMember
     */
    select?: CareCircleMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircleMember
     */
    omit?: CareCircleMemberOmit<ExtArgs> | null
    /**
     * The data used to create many CareCircleMembers.
     */
    data: CareCircleMemberCreateManyInput | CareCircleMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CareCircleMember update
   */
  export type CareCircleMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleMember
     */
    select?: CareCircleMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircleMember
     */
    omit?: CareCircleMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a CareCircleMember.
     */
    data: XOR<CareCircleMemberUpdateInput, CareCircleMemberUncheckedUpdateInput>
    /**
     * Choose, which CareCircleMember to update.
     */
    where: CareCircleMemberWhereUniqueInput
  }

  /**
   * CareCircleMember updateMany
   */
  export type CareCircleMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CareCircleMembers.
     */
    data: XOR<CareCircleMemberUpdateManyMutationInput, CareCircleMemberUncheckedUpdateManyInput>
    /**
     * Filter which CareCircleMembers to update
     */
    where?: CareCircleMemberWhereInput
    /**
     * Limit how many CareCircleMembers to update.
     */
    limit?: number
  }

  /**
   * CareCircleMember updateManyAndReturn
   */
  export type CareCircleMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleMember
     */
    select?: CareCircleMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircleMember
     */
    omit?: CareCircleMemberOmit<ExtArgs> | null
    /**
     * The data used to update CareCircleMembers.
     */
    data: XOR<CareCircleMemberUpdateManyMutationInput, CareCircleMemberUncheckedUpdateManyInput>
    /**
     * Filter which CareCircleMembers to update
     */
    where?: CareCircleMemberWhereInput
    /**
     * Limit how many CareCircleMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CareCircleMember upsert
   */
  export type CareCircleMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleMember
     */
    select?: CareCircleMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircleMember
     */
    omit?: CareCircleMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the CareCircleMember to update in case it exists.
     */
    where: CareCircleMemberWhereUniqueInput
    /**
     * In case the CareCircleMember found by the `where` argument doesn't exist, create a new CareCircleMember with this data.
     */
    create: XOR<CareCircleMemberCreateInput, CareCircleMemberUncheckedCreateInput>
    /**
     * In case the CareCircleMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CareCircleMemberUpdateInput, CareCircleMemberUncheckedUpdateInput>
  }

  /**
   * CareCircleMember delete
   */
  export type CareCircleMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleMember
     */
    select?: CareCircleMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircleMember
     */
    omit?: CareCircleMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleMemberInclude<ExtArgs> | null
    /**
     * Filter which CareCircleMember to delete.
     */
    where: CareCircleMemberWhereUniqueInput
  }

  /**
   * CareCircleMember deleteMany
   */
  export type CareCircleMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareCircleMembers to delete
     */
    where?: CareCircleMemberWhereInput
    /**
     * Limit how many CareCircleMembers to delete.
     */
    limit?: number
  }

  /**
   * CareCircleMember.consents
   */
  export type CareCircleMember$consentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    where?: ConsentWhereInput
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    cursor?: ConsentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * CareCircleMember without action
   */
  export type CareCircleMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleMember
     */
    select?: CareCircleMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircleMember
     */
    omit?: CareCircleMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleMemberInclude<ExtArgs> | null
  }


  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleMinAggregateOutputType = {
    id: string | null
    name: $Enums.RoleName | null
    description: string | null
    createdAt: Date | null
  }

  export type RoleMaxAggregateOutputType = {
    id: string | null
    name: $Enums.RoleName | null
    description: string | null
    createdAt: Date | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    _all: number
  }


  export type RoleMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: string
    name: $Enums.RoleName
    description: string | null
    createdAt: Date
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    memberships?: boolean | Role$membershipsArgs<ExtArgs>
    rolePermissions?: boolean | Role$rolePermissionsArgs<ExtArgs>
    invitations?: boolean | Role$invitationsArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | Role$membershipsArgs<ExtArgs>
    rolePermissions?: boolean | Role$rolePermissionsArgs<ExtArgs>
    invitations?: boolean | Role$invitationsArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      memberships: Prisma.$CareCircleMemberPayload<ExtArgs>[]
      rolePermissions: Prisma.$RolePermissionPayload<ExtArgs>[]
      invitations: Prisma.$InvitationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: $Enums.RoleName
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RoleCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {RoleUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoleUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    memberships<T extends Role$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, Role$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareCircleMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rolePermissions<T extends Role$rolePermissionsArgs<ExtArgs> = {}>(args?: Subset<T, Role$rolePermissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invitations<T extends Role$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, Role$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'String'>
    readonly name: FieldRef<"Role", 'RoleName'>
    readonly description: FieldRef<"Role", 'String'>
    readonly createdAt: FieldRef<"Role", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role createManyAndReturn
   */
  export type RoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role updateManyAndReturn
   */
  export type RoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.memberships
   */
  export type Role$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircleMember
     */
    select?: CareCircleMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircleMember
     */
    omit?: CareCircleMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleMemberInclude<ExtArgs> | null
    where?: CareCircleMemberWhereInput
    orderBy?: CareCircleMemberOrderByWithRelationInput | CareCircleMemberOrderByWithRelationInput[]
    cursor?: CareCircleMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CareCircleMemberScalarFieldEnum | CareCircleMemberScalarFieldEnum[]
  }

  /**
   * Role.rolePermissions
   */
  export type Role$rolePermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    where?: RolePermissionWhereInput
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    cursor?: RolePermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * Role.invitations
   */
  export type Role$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    cursor?: InvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model Permission
   */

  export type AggregatePermission = {
    _count: PermissionCountAggregateOutputType | null
    _min: PermissionMinAggregateOutputType | null
    _max: PermissionMaxAggregateOutputType | null
  }

  export type PermissionMinAggregateOutputType = {
    id: string | null
    key: string | null
    description: string | null
    createdAt: Date | null
  }

  export type PermissionMaxAggregateOutputType = {
    id: string | null
    key: string | null
    description: string | null
    createdAt: Date | null
  }

  export type PermissionCountAggregateOutputType = {
    id: number
    key: number
    description: number
    createdAt: number
    _all: number
  }


  export type PermissionMinAggregateInputType = {
    id?: true
    key?: true
    description?: true
    createdAt?: true
  }

  export type PermissionMaxAggregateInputType = {
    id?: true
    key?: true
    description?: true
    createdAt?: true
  }

  export type PermissionCountAggregateInputType = {
    id?: true
    key?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type PermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permission to aggregate.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Permissions
    **/
    _count?: true | PermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermissionMaxAggregateInputType
  }

  export type GetPermissionAggregateType<T extends PermissionAggregateArgs> = {
        [P in keyof T & keyof AggregatePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermission[P]>
      : GetScalarType<T[P], AggregatePermission[P]>
  }




  export type PermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionWhereInput
    orderBy?: PermissionOrderByWithAggregationInput | PermissionOrderByWithAggregationInput[]
    by: PermissionScalarFieldEnum[] | PermissionScalarFieldEnum
    having?: PermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermissionCountAggregateInputType | true
    _min?: PermissionMinAggregateInputType
    _max?: PermissionMaxAggregateInputType
  }

  export type PermissionGroupByOutputType = {
    id: string
    key: string
    description: string | null
    createdAt: Date
    _count: PermissionCountAggregateOutputType | null
    _min: PermissionMinAggregateOutputType | null
    _max: PermissionMaxAggregateOutputType | null
  }

  type GetPermissionGroupByPayload<T extends PermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermissionGroupByOutputType[P]>
            : GetScalarType<T[P], PermissionGroupByOutputType[P]>
        }
      >
    >


  export type PermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    description?: boolean
    createdAt?: boolean
    rolePermissions?: boolean | Permission$rolePermissionsArgs<ExtArgs>
    _count?: boolean | PermissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    description?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    description?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectScalar = {
    id?: boolean
    key?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type PermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "description" | "createdAt", ExtArgs["result"]["permission"]>
  export type PermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rolePermissions?: boolean | Permission$rolePermissionsArgs<ExtArgs>
    _count?: boolean | PermissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Permission"
    objects: {
      rolePermissions: Prisma.$RolePermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["permission"]>
    composites: {}
  }

  type PermissionGetPayload<S extends boolean | null | undefined | PermissionDefaultArgs> = $Result.GetResult<Prisma.$PermissionPayload, S>

  type PermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermissionCountAggregateInputType | true
    }

  export interface PermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Permission'], meta: { name: 'Permission' } }
    /**
     * Find zero or one Permission that matches the filter.
     * @param {PermissionFindUniqueArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermissionFindUniqueArgs>(args: SelectSubset<T, PermissionFindUniqueArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Permission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermissionFindUniqueOrThrowArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, PermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindFirstArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermissionFindFirstArgs>(args?: SelectSubset<T, PermissionFindFirstArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindFirstOrThrowArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, PermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Permissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Permissions
     * const permissions = await prisma.permission.findMany()
     * 
     * // Get first 10 Permissions
     * const permissions = await prisma.permission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const permissionWithIdOnly = await prisma.permission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PermissionFindManyArgs>(args?: SelectSubset<T, PermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Permission.
     * @param {PermissionCreateArgs} args - Arguments to create a Permission.
     * @example
     * // Create one Permission
     * const Permission = await prisma.permission.create({
     *   data: {
     *     // ... data to create a Permission
     *   }
     * })
     * 
     */
    create<T extends PermissionCreateArgs>(args: SelectSubset<T, PermissionCreateArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Permissions.
     * @param {PermissionCreateManyArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permission = await prisma.permission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermissionCreateManyArgs>(args?: SelectSubset<T, PermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Permissions and returns the data saved in the database.
     * @param {PermissionCreateManyAndReturnArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permission = await prisma.permission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Permissions and only return the `id`
     * const permissionWithIdOnly = await prisma.permission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, PermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Permission.
     * @param {PermissionDeleteArgs} args - Arguments to delete one Permission.
     * @example
     * // Delete one Permission
     * const Permission = await prisma.permission.delete({
     *   where: {
     *     // ... filter to delete one Permission
     *   }
     * })
     * 
     */
    delete<T extends PermissionDeleteArgs>(args: SelectSubset<T, PermissionDeleteArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Permission.
     * @param {PermissionUpdateArgs} args - Arguments to update one Permission.
     * @example
     * // Update one Permission
     * const permission = await prisma.permission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermissionUpdateArgs>(args: SelectSubset<T, PermissionUpdateArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Permissions.
     * @param {PermissionDeleteManyArgs} args - Arguments to filter Permissions to delete.
     * @example
     * // Delete a few Permissions
     * const { count } = await prisma.permission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermissionDeleteManyArgs>(args?: SelectSubset<T, PermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Permissions
     * const permission = await prisma.permission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermissionUpdateManyArgs>(args: SelectSubset<T, PermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions and returns the data updated in the database.
     * @param {PermissionUpdateManyAndReturnArgs} args - Arguments to update many Permissions.
     * @example
     * // Update many Permissions
     * const permission = await prisma.permission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Permissions and only return the `id`
     * const permissionWithIdOnly = await prisma.permission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, PermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Permission.
     * @param {PermissionUpsertArgs} args - Arguments to update or create a Permission.
     * @example
     * // Update or create a Permission
     * const permission = await prisma.permission.upsert({
     *   create: {
     *     // ... data to create a Permission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Permission we want to update
     *   }
     * })
     */
    upsert<T extends PermissionUpsertArgs>(args: SelectSubset<T, PermissionUpsertArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionCountArgs} args - Arguments to filter Permissions to count.
     * @example
     * // Count the number of Permissions
     * const count = await prisma.permission.count({
     *   where: {
     *     // ... the filter for the Permissions we want to count
     *   }
     * })
    **/
    count<T extends PermissionCountArgs>(
      args?: Subset<T, PermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Permission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PermissionAggregateArgs>(args: Subset<T, PermissionAggregateArgs>): Prisma.PrismaPromise<GetPermissionAggregateType<T>>

    /**
     * Group by Permission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermissionGroupByArgs['orderBy'] }
        : { orderBy?: PermissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Permission model
   */
  readonly fields: PermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Permission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rolePermissions<T extends Permission$rolePermissionsArgs<ExtArgs> = {}>(args?: Subset<T, Permission$rolePermissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Permission model
   */
  interface PermissionFieldRefs {
    readonly id: FieldRef<"Permission", 'String'>
    readonly key: FieldRef<"Permission", 'String'>
    readonly description: FieldRef<"Permission", 'String'>
    readonly createdAt: FieldRef<"Permission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Permission findUnique
   */
  export type PermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission findUniqueOrThrow
   */
  export type PermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission findFirst
   */
  export type PermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission findFirstOrThrow
   */
  export type PermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission findMany
   */
  export type PermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permissions to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission create
   */
  export type PermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Permission.
     */
    data: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
  }

  /**
   * Permission createMany
   */
  export type PermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Permissions.
     */
    data: PermissionCreateManyInput | PermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Permission createManyAndReturn
   */
  export type PermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data used to create many Permissions.
     */
    data: PermissionCreateManyInput | PermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Permission update
   */
  export type PermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Permission.
     */
    data: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
    /**
     * Choose, which Permission to update.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission updateMany
   */
  export type PermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to update.
     */
    limit?: number
  }

  /**
   * Permission updateManyAndReturn
   */
  export type PermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to update.
     */
    limit?: number
  }

  /**
   * Permission upsert
   */
  export type PermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Permission to update in case it exists.
     */
    where: PermissionWhereUniqueInput
    /**
     * In case the Permission found by the `where` argument doesn't exist, create a new Permission with this data.
     */
    create: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
    /**
     * In case the Permission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
  }

  /**
   * Permission delete
   */
  export type PermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter which Permission to delete.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission deleteMany
   */
  export type PermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permissions to delete
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to delete.
     */
    limit?: number
  }

  /**
   * Permission.rolePermissions
   */
  export type Permission$rolePermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    where?: RolePermissionWhereInput
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    cursor?: RolePermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * Permission without action
   */
  export type PermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
  }


  /**
   * Model RolePermission
   */

  export type AggregateRolePermission = {
    _count: RolePermissionCountAggregateOutputType | null
    _min: RolePermissionMinAggregateOutputType | null
    _max: RolePermissionMaxAggregateOutputType | null
  }

  export type RolePermissionMinAggregateOutputType = {
    roleId: string | null
    permissionId: string | null
  }

  export type RolePermissionMaxAggregateOutputType = {
    roleId: string | null
    permissionId: string | null
  }

  export type RolePermissionCountAggregateOutputType = {
    roleId: number
    permissionId: number
    _all: number
  }


  export type RolePermissionMinAggregateInputType = {
    roleId?: true
    permissionId?: true
  }

  export type RolePermissionMaxAggregateInputType = {
    roleId?: true
    permissionId?: true
  }

  export type RolePermissionCountAggregateInputType = {
    roleId?: true
    permissionId?: true
    _all?: true
  }

  export type RolePermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolePermission to aggregate.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RolePermissions
    **/
    _count?: true | RolePermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolePermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolePermissionMaxAggregateInputType
  }

  export type GetRolePermissionAggregateType<T extends RolePermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateRolePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRolePermission[P]>
      : GetScalarType<T[P], AggregateRolePermission[P]>
  }




  export type RolePermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissionWhereInput
    orderBy?: RolePermissionOrderByWithAggregationInput | RolePermissionOrderByWithAggregationInput[]
    by: RolePermissionScalarFieldEnum[] | RolePermissionScalarFieldEnum
    having?: RolePermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolePermissionCountAggregateInputType | true
    _min?: RolePermissionMinAggregateInputType
    _max?: RolePermissionMaxAggregateInputType
  }

  export type RolePermissionGroupByOutputType = {
    roleId: string
    permissionId: string
    _count: RolePermissionCountAggregateOutputType | null
    _min: RolePermissionMinAggregateOutputType | null
    _max: RolePermissionMaxAggregateOutputType | null
  }

  type GetRolePermissionGroupByPayload<T extends RolePermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolePermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolePermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolePermissionGroupByOutputType[P]>
            : GetScalarType<T[P], RolePermissionGroupByOutputType[P]>
        }
      >
    >


  export type RolePermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    roleId?: boolean
    permissionId?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rolePermission"]>

  export type RolePermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    roleId?: boolean
    permissionId?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rolePermission"]>

  export type RolePermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    roleId?: boolean
    permissionId?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rolePermission"]>

  export type RolePermissionSelectScalar = {
    roleId?: boolean
    permissionId?: boolean
  }

  export type RolePermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"roleId" | "permissionId", ExtArgs["result"]["rolePermission"]>
  export type RolePermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }
  export type RolePermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }
  export type RolePermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }

  export type $RolePermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RolePermission"
    objects: {
      role: Prisma.$RolePayload<ExtArgs>
      permission: Prisma.$PermissionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      roleId: string
      permissionId: string
    }, ExtArgs["result"]["rolePermission"]>
    composites: {}
  }

  type RolePermissionGetPayload<S extends boolean | null | undefined | RolePermissionDefaultArgs> = $Result.GetResult<Prisma.$RolePermissionPayload, S>

  type RolePermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RolePermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RolePermissionCountAggregateInputType | true
    }

  export interface RolePermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RolePermission'], meta: { name: 'RolePermission' } }
    /**
     * Find zero or one RolePermission that matches the filter.
     * @param {RolePermissionFindUniqueArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RolePermissionFindUniqueArgs>(args: SelectSubset<T, RolePermissionFindUniqueArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RolePermission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RolePermissionFindUniqueOrThrowArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RolePermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, RolePermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RolePermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindFirstArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RolePermissionFindFirstArgs>(args?: SelectSubset<T, RolePermissionFindFirstArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RolePermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindFirstOrThrowArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RolePermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, RolePermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RolePermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RolePermissions
     * const rolePermissions = await prisma.rolePermission.findMany()
     * 
     * // Get first 10 RolePermissions
     * const rolePermissions = await prisma.rolePermission.findMany({ take: 10 })
     * 
     * // Only select the `roleId`
     * const rolePermissionWithRoleIdOnly = await prisma.rolePermission.findMany({ select: { roleId: true } })
     * 
     */
    findMany<T extends RolePermissionFindManyArgs>(args?: SelectSubset<T, RolePermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RolePermission.
     * @param {RolePermissionCreateArgs} args - Arguments to create a RolePermission.
     * @example
     * // Create one RolePermission
     * const RolePermission = await prisma.rolePermission.create({
     *   data: {
     *     // ... data to create a RolePermission
     *   }
     * })
     * 
     */
    create<T extends RolePermissionCreateArgs>(args: SelectSubset<T, RolePermissionCreateArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RolePermissions.
     * @param {RolePermissionCreateManyArgs} args - Arguments to create many RolePermissions.
     * @example
     * // Create many RolePermissions
     * const rolePermission = await prisma.rolePermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RolePermissionCreateManyArgs>(args?: SelectSubset<T, RolePermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RolePermissions and returns the data saved in the database.
     * @param {RolePermissionCreateManyAndReturnArgs} args - Arguments to create many RolePermissions.
     * @example
     * // Create many RolePermissions
     * const rolePermission = await prisma.rolePermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RolePermissions and only return the `roleId`
     * const rolePermissionWithRoleIdOnly = await prisma.rolePermission.createManyAndReturn({
     *   select: { roleId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RolePermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, RolePermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RolePermission.
     * @param {RolePermissionDeleteArgs} args - Arguments to delete one RolePermission.
     * @example
     * // Delete one RolePermission
     * const RolePermission = await prisma.rolePermission.delete({
     *   where: {
     *     // ... filter to delete one RolePermission
     *   }
     * })
     * 
     */
    delete<T extends RolePermissionDeleteArgs>(args: SelectSubset<T, RolePermissionDeleteArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RolePermission.
     * @param {RolePermissionUpdateArgs} args - Arguments to update one RolePermission.
     * @example
     * // Update one RolePermission
     * const rolePermission = await prisma.rolePermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RolePermissionUpdateArgs>(args: SelectSubset<T, RolePermissionUpdateArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RolePermissions.
     * @param {RolePermissionDeleteManyArgs} args - Arguments to filter RolePermissions to delete.
     * @example
     * // Delete a few RolePermissions
     * const { count } = await prisma.rolePermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RolePermissionDeleteManyArgs>(args?: SelectSubset<T, RolePermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RolePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RolePermissions
     * const rolePermission = await prisma.rolePermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RolePermissionUpdateManyArgs>(args: SelectSubset<T, RolePermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RolePermissions and returns the data updated in the database.
     * @param {RolePermissionUpdateManyAndReturnArgs} args - Arguments to update many RolePermissions.
     * @example
     * // Update many RolePermissions
     * const rolePermission = await prisma.rolePermission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RolePermissions and only return the `roleId`
     * const rolePermissionWithRoleIdOnly = await prisma.rolePermission.updateManyAndReturn({
     *   select: { roleId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RolePermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, RolePermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RolePermission.
     * @param {RolePermissionUpsertArgs} args - Arguments to update or create a RolePermission.
     * @example
     * // Update or create a RolePermission
     * const rolePermission = await prisma.rolePermission.upsert({
     *   create: {
     *     // ... data to create a RolePermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RolePermission we want to update
     *   }
     * })
     */
    upsert<T extends RolePermissionUpsertArgs>(args: SelectSubset<T, RolePermissionUpsertArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RolePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionCountArgs} args - Arguments to filter RolePermissions to count.
     * @example
     * // Count the number of RolePermissions
     * const count = await prisma.rolePermission.count({
     *   where: {
     *     // ... the filter for the RolePermissions we want to count
     *   }
     * })
    **/
    count<T extends RolePermissionCountArgs>(
      args?: Subset<T, RolePermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolePermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RolePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolePermissionAggregateArgs>(args: Subset<T, RolePermissionAggregateArgs>): Prisma.PrismaPromise<GetRolePermissionAggregateType<T>>

    /**
     * Group by RolePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RolePermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolePermissionGroupByArgs['orderBy'] }
        : { orderBy?: RolePermissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RolePermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolePermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RolePermission model
   */
  readonly fields: RolePermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RolePermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RolePermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    permission<T extends PermissionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PermissionDefaultArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RolePermission model
   */
  interface RolePermissionFieldRefs {
    readonly roleId: FieldRef<"RolePermission", 'String'>
    readonly permissionId: FieldRef<"RolePermission", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RolePermission findUnique
   */
  export type RolePermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission findUniqueOrThrow
   */
  export type RolePermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission findFirst
   */
  export type RolePermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissions.
     */
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * RolePermission findFirstOrThrow
   */
  export type RolePermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissions.
     */
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * RolePermission findMany
   */
  export type RolePermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermissions to fetch.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissions.
     */
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * RolePermission create
   */
  export type RolePermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a RolePermission.
     */
    data: XOR<RolePermissionCreateInput, RolePermissionUncheckedCreateInput>
  }

  /**
   * RolePermission createMany
   */
  export type RolePermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RolePermissions.
     */
    data: RolePermissionCreateManyInput | RolePermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RolePermission createManyAndReturn
   */
  export type RolePermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * The data used to create many RolePermissions.
     */
    data: RolePermissionCreateManyInput | RolePermissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RolePermission update
   */
  export type RolePermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a RolePermission.
     */
    data: XOR<RolePermissionUpdateInput, RolePermissionUncheckedUpdateInput>
    /**
     * Choose, which RolePermission to update.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission updateMany
   */
  export type RolePermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RolePermissions.
     */
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyInput>
    /**
     * Filter which RolePermissions to update
     */
    where?: RolePermissionWhereInput
    /**
     * Limit how many RolePermissions to update.
     */
    limit?: number
  }

  /**
   * RolePermission updateManyAndReturn
   */
  export type RolePermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * The data used to update RolePermissions.
     */
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyInput>
    /**
     * Filter which RolePermissions to update
     */
    where?: RolePermissionWhereInput
    /**
     * Limit how many RolePermissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RolePermission upsert
   */
  export type RolePermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the RolePermission to update in case it exists.
     */
    where: RolePermissionWhereUniqueInput
    /**
     * In case the RolePermission found by the `where` argument doesn't exist, create a new RolePermission with this data.
     */
    create: XOR<RolePermissionCreateInput, RolePermissionUncheckedCreateInput>
    /**
     * In case the RolePermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolePermissionUpdateInput, RolePermissionUncheckedUpdateInput>
  }

  /**
   * RolePermission delete
   */
  export type RolePermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter which RolePermission to delete.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission deleteMany
   */
  export type RolePermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolePermissions to delete
     */
    where?: RolePermissionWhereInput
    /**
     * Limit how many RolePermissions to delete.
     */
    limit?: number
  }

  /**
   * RolePermission without action
   */
  export type RolePermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
  }


  /**
   * Model Invitation
   */

  export type AggregateInvitation = {
    _count: InvitationCountAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  export type InvitationMinAggregateOutputType = {
    id: string | null
    circleId: string | null
    invitedById: string | null
    roleId: string | null
    email: string | null
    phone: string | null
    tokenHash: string | null
    status: $Enums.InvitationStatus | null
    expiresAt: Date | null
    acceptedAt: Date | null
    createdAt: Date | null
  }

  export type InvitationMaxAggregateOutputType = {
    id: string | null
    circleId: string | null
    invitedById: string | null
    roleId: string | null
    email: string | null
    phone: string | null
    tokenHash: string | null
    status: $Enums.InvitationStatus | null
    expiresAt: Date | null
    acceptedAt: Date | null
    createdAt: Date | null
  }

  export type InvitationCountAggregateOutputType = {
    id: number
    circleId: number
    invitedById: number
    roleId: number
    email: number
    phone: number
    tokenHash: number
    status: number
    expiresAt: number
    acceptedAt: number
    createdAt: number
    _all: number
  }


  export type InvitationMinAggregateInputType = {
    id?: true
    circleId?: true
    invitedById?: true
    roleId?: true
    email?: true
    phone?: true
    tokenHash?: true
    status?: true
    expiresAt?: true
    acceptedAt?: true
    createdAt?: true
  }

  export type InvitationMaxAggregateInputType = {
    id?: true
    circleId?: true
    invitedById?: true
    roleId?: true
    email?: true
    phone?: true
    tokenHash?: true
    status?: true
    expiresAt?: true
    acceptedAt?: true
    createdAt?: true
  }

  export type InvitationCountAggregateInputType = {
    id?: true
    circleId?: true
    invitedById?: true
    roleId?: true
    email?: true
    phone?: true
    tokenHash?: true
    status?: true
    expiresAt?: true
    acceptedAt?: true
    createdAt?: true
    _all?: true
  }

  export type InvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitation to aggregate.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invitations
    **/
    _count?: true | InvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationMaxAggregateInputType
  }

  export type GetInvitationAggregateType<T extends InvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitation[P]>
      : GetScalarType<T[P], AggregateInvitation[P]>
  }




  export type InvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithAggregationInput | InvitationOrderByWithAggregationInput[]
    by: InvitationScalarFieldEnum[] | InvitationScalarFieldEnum
    having?: InvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationCountAggregateInputType | true
    _min?: InvitationMinAggregateInputType
    _max?: InvitationMaxAggregateInputType
  }

  export type InvitationGroupByOutputType = {
    id: string
    circleId: string
    invitedById: string
    roleId: string
    email: string | null
    phone: string | null
    tokenHash: string
    status: $Enums.InvitationStatus
    expiresAt: Date
    acceptedAt: Date | null
    createdAt: Date
    _count: InvitationCountAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  type GetInvitationGroupByPayload<T extends InvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationGroupByOutputType[P]>
        }
      >
    >


  export type InvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    circleId?: boolean
    invitedById?: boolean
    roleId?: boolean
    email?: boolean
    phone?: boolean
    tokenHash?: boolean
    status?: boolean
    expiresAt?: boolean
    acceptedAt?: boolean
    createdAt?: boolean
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type InvitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    circleId?: boolean
    invitedById?: boolean
    roleId?: boolean
    email?: boolean
    phone?: boolean
    tokenHash?: boolean
    status?: boolean
    expiresAt?: boolean
    acceptedAt?: boolean
    createdAt?: boolean
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type InvitationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    circleId?: boolean
    invitedById?: boolean
    roleId?: boolean
    email?: boolean
    phone?: boolean
    tokenHash?: boolean
    status?: boolean
    expiresAt?: boolean
    acceptedAt?: boolean
    createdAt?: boolean
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type InvitationSelectScalar = {
    id?: boolean
    circleId?: boolean
    invitedById?: boolean
    roleId?: boolean
    email?: boolean
    phone?: boolean
    tokenHash?: boolean
    status?: boolean
    expiresAt?: boolean
    acceptedAt?: boolean
    createdAt?: boolean
  }

  export type InvitationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "circleId" | "invitedById" | "roleId" | "email" | "phone" | "tokenHash" | "status" | "expiresAt" | "acceptedAt" | "createdAt", ExtArgs["result"]["invitation"]>
  export type InvitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }
  export type InvitationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }
  export type InvitationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    invitedBy?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }

  export type $InvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invitation"
    objects: {
      circle: Prisma.$CareCirclePayload<ExtArgs>
      invitedBy: Prisma.$UserPayload<ExtArgs>
      role: Prisma.$RolePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      circleId: string
      invitedById: string
      roleId: string
      email: string | null
      phone: string | null
      tokenHash: string
      status: $Enums.InvitationStatus
      expiresAt: Date
      acceptedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["invitation"]>
    composites: {}
  }

  type InvitationGetPayload<S extends boolean | null | undefined | InvitationDefaultArgs> = $Result.GetResult<Prisma.$InvitationPayload, S>

  type InvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvitationCountAggregateInputType | true
    }

  export interface InvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invitation'], meta: { name: 'Invitation' } }
    /**
     * Find zero or one Invitation that matches the filter.
     * @param {InvitationFindUniqueArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvitationFindUniqueArgs>(args: SelectSubset<T, InvitationFindUniqueArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Invitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvitationFindUniqueOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvitationFindUniqueOrThrowArgs>(args: SelectSubset<T, InvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvitationFindFirstArgs>(args?: SelectSubset<T, InvitationFindFirstArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvitationFindFirstOrThrowArgs>(args?: SelectSubset<T, InvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Invitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invitations
     * const invitations = await prisma.invitation.findMany()
     * 
     * // Get first 10 Invitations
     * const invitations = await prisma.invitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationWithIdOnly = await prisma.invitation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvitationFindManyArgs>(args?: SelectSubset<T, InvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Invitation.
     * @param {InvitationCreateArgs} args - Arguments to create a Invitation.
     * @example
     * // Create one Invitation
     * const Invitation = await prisma.invitation.create({
     *   data: {
     *     // ... data to create a Invitation
     *   }
     * })
     * 
     */
    create<T extends InvitationCreateArgs>(args: SelectSubset<T, InvitationCreateArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Invitations.
     * @param {InvitationCreateManyArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitation = await prisma.invitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvitationCreateManyArgs>(args?: SelectSubset<T, InvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invitations and returns the data saved in the database.
     * @param {InvitationCreateManyAndReturnArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitation = await prisma.invitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invitations and only return the `id`
     * const invitationWithIdOnly = await prisma.invitation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvitationCreateManyAndReturnArgs>(args?: SelectSubset<T, InvitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Invitation.
     * @param {InvitationDeleteArgs} args - Arguments to delete one Invitation.
     * @example
     * // Delete one Invitation
     * const Invitation = await prisma.invitation.delete({
     *   where: {
     *     // ... filter to delete one Invitation
     *   }
     * })
     * 
     */
    delete<T extends InvitationDeleteArgs>(args: SelectSubset<T, InvitationDeleteArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Invitation.
     * @param {InvitationUpdateArgs} args - Arguments to update one Invitation.
     * @example
     * // Update one Invitation
     * const invitation = await prisma.invitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvitationUpdateArgs>(args: SelectSubset<T, InvitationUpdateArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Invitations.
     * @param {InvitationDeleteManyArgs} args - Arguments to filter Invitations to delete.
     * @example
     * // Delete a few Invitations
     * const { count } = await prisma.invitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvitationDeleteManyArgs>(args?: SelectSubset<T, InvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invitations
     * const invitation = await prisma.invitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvitationUpdateManyArgs>(args: SelectSubset<T, InvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations and returns the data updated in the database.
     * @param {InvitationUpdateManyAndReturnArgs} args - Arguments to update many Invitations.
     * @example
     * // Update many Invitations
     * const invitation = await prisma.invitation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Invitations and only return the `id`
     * const invitationWithIdOnly = await prisma.invitation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvitationUpdateManyAndReturnArgs>(args: SelectSubset<T, InvitationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Invitation.
     * @param {InvitationUpsertArgs} args - Arguments to update or create a Invitation.
     * @example
     * // Update or create a Invitation
     * const invitation = await prisma.invitation.upsert({
     *   create: {
     *     // ... data to create a Invitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invitation we want to update
     *   }
     * })
     */
    upsert<T extends InvitationUpsertArgs>(args: SelectSubset<T, InvitationUpsertArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationCountArgs} args - Arguments to filter Invitations to count.
     * @example
     * // Count the number of Invitations
     * const count = await prisma.invitation.count({
     *   where: {
     *     // ... the filter for the Invitations we want to count
     *   }
     * })
    **/
    count<T extends InvitationCountArgs>(
      args?: Subset<T, InvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationAggregateArgs>(args: Subset<T, InvitationAggregateArgs>): Prisma.PrismaPromise<GetInvitationAggregateType<T>>

    /**
     * Group by Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationGroupByArgs['orderBy'] }
        : { orderBy?: InvitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invitation model
   */
  readonly fields: InvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    circle<T extends CareCircleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CareCircleDefaultArgs<ExtArgs>>): Prisma__CareCircleClient<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    invitedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invitation model
   */
  interface InvitationFieldRefs {
    readonly id: FieldRef<"Invitation", 'String'>
    readonly circleId: FieldRef<"Invitation", 'String'>
    readonly invitedById: FieldRef<"Invitation", 'String'>
    readonly roleId: FieldRef<"Invitation", 'String'>
    readonly email: FieldRef<"Invitation", 'String'>
    readonly phone: FieldRef<"Invitation", 'String'>
    readonly tokenHash: FieldRef<"Invitation", 'String'>
    readonly status: FieldRef<"Invitation", 'InvitationStatus'>
    readonly expiresAt: FieldRef<"Invitation", 'DateTime'>
    readonly acceptedAt: FieldRef<"Invitation", 'DateTime'>
    readonly createdAt: FieldRef<"Invitation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Invitation findUnique
   */
  export type InvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation findUniqueOrThrow
   */
  export type InvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation findFirst
   */
  export type InvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation findFirstOrThrow
   */
  export type InvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation findMany
   */
  export type InvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitations to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation create
   */
  export type InvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The data needed to create a Invitation.
     */
    data: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
  }

  /**
   * Invitation createMany
   */
  export type InvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invitations.
     */
    data: InvitationCreateManyInput | InvitationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invitation createManyAndReturn
   */
  export type InvitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * The data used to create many Invitations.
     */
    data: InvitationCreateManyInput | InvitationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invitation update
   */
  export type InvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The data needed to update a Invitation.
     */
    data: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
    /**
     * Choose, which Invitation to update.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation updateMany
   */
  export type InvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invitations.
     */
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyInput>
    /**
     * Filter which Invitations to update
     */
    where?: InvitationWhereInput
    /**
     * Limit how many Invitations to update.
     */
    limit?: number
  }

  /**
   * Invitation updateManyAndReturn
   */
  export type InvitationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * The data used to update Invitations.
     */
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyInput>
    /**
     * Filter which Invitations to update
     */
    where?: InvitationWhereInput
    /**
     * Limit how many Invitations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invitation upsert
   */
  export type InvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The filter to search for the Invitation to update in case it exists.
     */
    where: InvitationWhereUniqueInput
    /**
     * In case the Invitation found by the `where` argument doesn't exist, create a new Invitation with this data.
     */
    create: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
    /**
     * In case the Invitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
  }

  /**
   * Invitation delete
   */
  export type InvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter which Invitation to delete.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation deleteMany
   */
  export type InvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitations to delete
     */
    where?: InvitationWhereInput
    /**
     * Limit how many Invitations to delete.
     */
    limit?: number
  }

  /**
   * Invitation without action
   */
  export type InvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
  }


  /**
   * Model Consent
   */

  export type AggregateConsent = {
    _count: ConsentCountAggregateOutputType | null
    _min: ConsentMinAggregateOutputType | null
    _max: ConsentMaxAggregateOutputType | null
  }

  export type ConsentMinAggregateOutputType = {
    id: string | null
    circleId: string | null
    memberId: string | null
    grantedById: string | null
    status: $Enums.ConsentStatus | null
    grantedAt: Date | null
    revokedAt: Date | null
    expiresAt: Date | null
  }

  export type ConsentMaxAggregateOutputType = {
    id: string | null
    circleId: string | null
    memberId: string | null
    grantedById: string | null
    status: $Enums.ConsentStatus | null
    grantedAt: Date | null
    revokedAt: Date | null
    expiresAt: Date | null
  }

  export type ConsentCountAggregateOutputType = {
    id: number
    circleId: number
    memberId: number
    grantedById: number
    status: number
    scope: number
    grantedAt: number
    revokedAt: number
    expiresAt: number
    _all: number
  }


  export type ConsentMinAggregateInputType = {
    id?: true
    circleId?: true
    memberId?: true
    grantedById?: true
    status?: true
    grantedAt?: true
    revokedAt?: true
    expiresAt?: true
  }

  export type ConsentMaxAggregateInputType = {
    id?: true
    circleId?: true
    memberId?: true
    grantedById?: true
    status?: true
    grantedAt?: true
    revokedAt?: true
    expiresAt?: true
  }

  export type ConsentCountAggregateInputType = {
    id?: true
    circleId?: true
    memberId?: true
    grantedById?: true
    status?: true
    scope?: true
    grantedAt?: true
    revokedAt?: true
    expiresAt?: true
    _all?: true
  }

  export type ConsentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consent to aggregate.
     */
    where?: ConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consents to fetch.
     */
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Consents
    **/
    _count?: true | ConsentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsentMaxAggregateInputType
  }

  export type GetConsentAggregateType<T extends ConsentAggregateArgs> = {
        [P in keyof T & keyof AggregateConsent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsent[P]>
      : GetScalarType<T[P], AggregateConsent[P]>
  }




  export type ConsentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsentWhereInput
    orderBy?: ConsentOrderByWithAggregationInput | ConsentOrderByWithAggregationInput[]
    by: ConsentScalarFieldEnum[] | ConsentScalarFieldEnum
    having?: ConsentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsentCountAggregateInputType | true
    _min?: ConsentMinAggregateInputType
    _max?: ConsentMaxAggregateInputType
  }

  export type ConsentGroupByOutputType = {
    id: string
    circleId: string
    memberId: string
    grantedById: string
    status: $Enums.ConsentStatus
    scope: JsonValue
    grantedAt: Date
    revokedAt: Date | null
    expiresAt: Date | null
    _count: ConsentCountAggregateOutputType | null
    _min: ConsentMinAggregateOutputType | null
    _max: ConsentMaxAggregateOutputType | null
  }

  type GetConsentGroupByPayload<T extends ConsentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsentGroupByOutputType[P]>
            : GetScalarType<T[P], ConsentGroupByOutputType[P]>
        }
      >
    >


  export type ConsentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    circleId?: boolean
    memberId?: boolean
    grantedById?: boolean
    status?: boolean
    scope?: boolean
    grantedAt?: boolean
    revokedAt?: boolean
    expiresAt?: boolean
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    member?: boolean | CareCircleMemberDefaultArgs<ExtArgs>
    grantedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consent"]>

  export type ConsentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    circleId?: boolean
    memberId?: boolean
    grantedById?: boolean
    status?: boolean
    scope?: boolean
    grantedAt?: boolean
    revokedAt?: boolean
    expiresAt?: boolean
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    member?: boolean | CareCircleMemberDefaultArgs<ExtArgs>
    grantedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consent"]>

  export type ConsentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    circleId?: boolean
    memberId?: boolean
    grantedById?: boolean
    status?: boolean
    scope?: boolean
    grantedAt?: boolean
    revokedAt?: boolean
    expiresAt?: boolean
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    member?: boolean | CareCircleMemberDefaultArgs<ExtArgs>
    grantedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consent"]>

  export type ConsentSelectScalar = {
    id?: boolean
    circleId?: boolean
    memberId?: boolean
    grantedById?: boolean
    status?: boolean
    scope?: boolean
    grantedAt?: boolean
    revokedAt?: boolean
    expiresAt?: boolean
  }

  export type ConsentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "circleId" | "memberId" | "grantedById" | "status" | "scope" | "grantedAt" | "revokedAt" | "expiresAt", ExtArgs["result"]["consent"]>
  export type ConsentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    member?: boolean | CareCircleMemberDefaultArgs<ExtArgs>
    grantedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConsentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    member?: boolean | CareCircleMemberDefaultArgs<ExtArgs>
    grantedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConsentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    circle?: boolean | CareCircleDefaultArgs<ExtArgs>
    member?: boolean | CareCircleMemberDefaultArgs<ExtArgs>
    grantedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ConsentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Consent"
    objects: {
      circle: Prisma.$CareCirclePayload<ExtArgs>
      member: Prisma.$CareCircleMemberPayload<ExtArgs>
      grantedBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      circleId: string
      memberId: string
      grantedById: string
      status: $Enums.ConsentStatus
      scope: Prisma.JsonValue
      grantedAt: Date
      revokedAt: Date | null
      expiresAt: Date | null
    }, ExtArgs["result"]["consent"]>
    composites: {}
  }

  type ConsentGetPayload<S extends boolean | null | undefined | ConsentDefaultArgs> = $Result.GetResult<Prisma.$ConsentPayload, S>

  type ConsentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConsentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConsentCountAggregateInputType | true
    }

  export interface ConsentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Consent'], meta: { name: 'Consent' } }
    /**
     * Find zero or one Consent that matches the filter.
     * @param {ConsentFindUniqueArgs} args - Arguments to find a Consent
     * @example
     * // Get one Consent
     * const consent = await prisma.consent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConsentFindUniqueArgs>(args: SelectSubset<T, ConsentFindUniqueArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Consent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConsentFindUniqueOrThrowArgs} args - Arguments to find a Consent
     * @example
     * // Get one Consent
     * const consent = await prisma.consent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConsentFindUniqueOrThrowArgs>(args: SelectSubset<T, ConsentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentFindFirstArgs} args - Arguments to find a Consent
     * @example
     * // Get one Consent
     * const consent = await prisma.consent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConsentFindFirstArgs>(args?: SelectSubset<T, ConsentFindFirstArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentFindFirstOrThrowArgs} args - Arguments to find a Consent
     * @example
     * // Get one Consent
     * const consent = await prisma.consent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConsentFindFirstOrThrowArgs>(args?: SelectSubset<T, ConsentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Consents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Consents
     * const consents = await prisma.consent.findMany()
     * 
     * // Get first 10 Consents
     * const consents = await prisma.consent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const consentWithIdOnly = await prisma.consent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConsentFindManyArgs>(args?: SelectSubset<T, ConsentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Consent.
     * @param {ConsentCreateArgs} args - Arguments to create a Consent.
     * @example
     * // Create one Consent
     * const Consent = await prisma.consent.create({
     *   data: {
     *     // ... data to create a Consent
     *   }
     * })
     * 
     */
    create<T extends ConsentCreateArgs>(args: SelectSubset<T, ConsentCreateArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Consents.
     * @param {ConsentCreateManyArgs} args - Arguments to create many Consents.
     * @example
     * // Create many Consents
     * const consent = await prisma.consent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConsentCreateManyArgs>(args?: SelectSubset<T, ConsentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Consents and returns the data saved in the database.
     * @param {ConsentCreateManyAndReturnArgs} args - Arguments to create many Consents.
     * @example
     * // Create many Consents
     * const consent = await prisma.consent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Consents and only return the `id`
     * const consentWithIdOnly = await prisma.consent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConsentCreateManyAndReturnArgs>(args?: SelectSubset<T, ConsentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Consent.
     * @param {ConsentDeleteArgs} args - Arguments to delete one Consent.
     * @example
     * // Delete one Consent
     * const Consent = await prisma.consent.delete({
     *   where: {
     *     // ... filter to delete one Consent
     *   }
     * })
     * 
     */
    delete<T extends ConsentDeleteArgs>(args: SelectSubset<T, ConsentDeleteArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Consent.
     * @param {ConsentUpdateArgs} args - Arguments to update one Consent.
     * @example
     * // Update one Consent
     * const consent = await prisma.consent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConsentUpdateArgs>(args: SelectSubset<T, ConsentUpdateArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Consents.
     * @param {ConsentDeleteManyArgs} args - Arguments to filter Consents to delete.
     * @example
     * // Delete a few Consents
     * const { count } = await prisma.consent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConsentDeleteManyArgs>(args?: SelectSubset<T, ConsentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Consents
     * const consent = await prisma.consent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConsentUpdateManyArgs>(args: SelectSubset<T, ConsentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consents and returns the data updated in the database.
     * @param {ConsentUpdateManyAndReturnArgs} args - Arguments to update many Consents.
     * @example
     * // Update many Consents
     * const consent = await prisma.consent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Consents and only return the `id`
     * const consentWithIdOnly = await prisma.consent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConsentUpdateManyAndReturnArgs>(args: SelectSubset<T, ConsentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Consent.
     * @param {ConsentUpsertArgs} args - Arguments to update or create a Consent.
     * @example
     * // Update or create a Consent
     * const consent = await prisma.consent.upsert({
     *   create: {
     *     // ... data to create a Consent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Consent we want to update
     *   }
     * })
     */
    upsert<T extends ConsentUpsertArgs>(args: SelectSubset<T, ConsentUpsertArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Consents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentCountArgs} args - Arguments to filter Consents to count.
     * @example
     * // Count the number of Consents
     * const count = await prisma.consent.count({
     *   where: {
     *     // ... the filter for the Consents we want to count
     *   }
     * })
    **/
    count<T extends ConsentCountArgs>(
      args?: Subset<T, ConsentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Consent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConsentAggregateArgs>(args: Subset<T, ConsentAggregateArgs>): Prisma.PrismaPromise<GetConsentAggregateType<T>>

    /**
     * Group by Consent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConsentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConsentGroupByArgs['orderBy'] }
        : { orderBy?: ConsentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConsentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Consent model
   */
  readonly fields: ConsentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Consent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConsentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    circle<T extends CareCircleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CareCircleDefaultArgs<ExtArgs>>): Prisma__CareCircleClient<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    member<T extends CareCircleMemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CareCircleMemberDefaultArgs<ExtArgs>>): Prisma__CareCircleMemberClient<$Result.GetResult<Prisma.$CareCircleMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    grantedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Consent model
   */
  interface ConsentFieldRefs {
    readonly id: FieldRef<"Consent", 'String'>
    readonly circleId: FieldRef<"Consent", 'String'>
    readonly memberId: FieldRef<"Consent", 'String'>
    readonly grantedById: FieldRef<"Consent", 'String'>
    readonly status: FieldRef<"Consent", 'ConsentStatus'>
    readonly scope: FieldRef<"Consent", 'Json'>
    readonly grantedAt: FieldRef<"Consent", 'DateTime'>
    readonly revokedAt: FieldRef<"Consent", 'DateTime'>
    readonly expiresAt: FieldRef<"Consent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Consent findUnique
   */
  export type ConsentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consent to fetch.
     */
    where: ConsentWhereUniqueInput
  }

  /**
   * Consent findUniqueOrThrow
   */
  export type ConsentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consent to fetch.
     */
    where: ConsentWhereUniqueInput
  }

  /**
   * Consent findFirst
   */
  export type ConsentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consent to fetch.
     */
    where?: ConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consents to fetch.
     */
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consents.
     */
    cursor?: ConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consents.
     */
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * Consent findFirstOrThrow
   */
  export type ConsentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consent to fetch.
     */
    where?: ConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consents to fetch.
     */
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consents.
     */
    cursor?: ConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consents.
     */
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * Consent findMany
   */
  export type ConsentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consents to fetch.
     */
    where?: ConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consents to fetch.
     */
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Consents.
     */
    cursor?: ConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consents.
     */
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * Consent create
   */
  export type ConsentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * The data needed to create a Consent.
     */
    data: XOR<ConsentCreateInput, ConsentUncheckedCreateInput>
  }

  /**
   * Consent createMany
   */
  export type ConsentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Consents.
     */
    data: ConsentCreateManyInput | ConsentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Consent createManyAndReturn
   */
  export type ConsentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * The data used to create many Consents.
     */
    data: ConsentCreateManyInput | ConsentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consent update
   */
  export type ConsentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * The data needed to update a Consent.
     */
    data: XOR<ConsentUpdateInput, ConsentUncheckedUpdateInput>
    /**
     * Choose, which Consent to update.
     */
    where: ConsentWhereUniqueInput
  }

  /**
   * Consent updateMany
   */
  export type ConsentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Consents.
     */
    data: XOR<ConsentUpdateManyMutationInput, ConsentUncheckedUpdateManyInput>
    /**
     * Filter which Consents to update
     */
    where?: ConsentWhereInput
    /**
     * Limit how many Consents to update.
     */
    limit?: number
  }

  /**
   * Consent updateManyAndReturn
   */
  export type ConsentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * The data used to update Consents.
     */
    data: XOR<ConsentUpdateManyMutationInput, ConsentUncheckedUpdateManyInput>
    /**
     * Filter which Consents to update
     */
    where?: ConsentWhereInput
    /**
     * Limit how many Consents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consent upsert
   */
  export type ConsentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * The filter to search for the Consent to update in case it exists.
     */
    where: ConsentWhereUniqueInput
    /**
     * In case the Consent found by the `where` argument doesn't exist, create a new Consent with this data.
     */
    create: XOR<ConsentCreateInput, ConsentUncheckedCreateInput>
    /**
     * In case the Consent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConsentUpdateInput, ConsentUncheckedUpdateInput>
  }

  /**
   * Consent delete
   */
  export type ConsentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter which Consent to delete.
     */
    where: ConsentWhereUniqueInput
  }

  /**
   * Consent deleteMany
   */
  export type ConsentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consents to delete
     */
    where?: ConsentWhereInput
    /**
     * Limit how many Consents to delete.
     */
    limit?: number
  }

  /**
   * Consent without action
   */
  export type ConsentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    actorId: string | null
    circleId: string | null
    action: string | null
    resourceType: string | null
    resourceId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    actorId: string | null
    circleId: string | null
    action: string | null
    resourceType: string | null
    resourceId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    actorId: number
    circleId: number
    action: number
    resourceType: number
    resourceId: number
    metadata: number
    ipAddress: number
    userAgent: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    actorId?: true
    circleId?: true
    action?: true
    resourceType?: true
    resourceId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    actorId?: true
    circleId?: true
    action?: true
    resourceType?: true
    resourceId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    actorId?: true
    circleId?: true
    action?: true
    resourceType?: true
    resourceId?: true
    metadata?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    actorId: string
    circleId: string | null
    action: string
    resourceType: string
    resourceId: string | null
    metadata: JsonValue | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorId?: boolean
    circleId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    actor?: boolean | UserDefaultArgs<ExtArgs>
    circle?: boolean | AuditLog$circleArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorId?: boolean
    circleId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    actor?: boolean | UserDefaultArgs<ExtArgs>
    circle?: boolean | AuditLog$circleArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorId?: boolean
    circleId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    actor?: boolean | UserDefaultArgs<ExtArgs>
    circle?: boolean | AuditLog$circleArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    actorId?: boolean
    circleId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "actorId" | "circleId" | "action" | "resourceType" | "resourceId" | "metadata" | "ipAddress" | "userAgent" | "createdAt", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actor?: boolean | UserDefaultArgs<ExtArgs>
    circle?: boolean | AuditLog$circleArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actor?: boolean | UserDefaultArgs<ExtArgs>
    circle?: boolean | AuditLog$circleArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actor?: boolean | UserDefaultArgs<ExtArgs>
    circle?: boolean | AuditLog$circleArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      actor: Prisma.$UserPayload<ExtArgs>
      circle: Prisma.$CareCirclePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      actorId: string
      circleId: string | null
      action: string
      resourceType: string
      resourceId: string | null
      metadata: Prisma.JsonValue | null
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    actor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    circle<T extends AuditLog$circleArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$circleArgs<ExtArgs>>): Prisma__CareCircleClient<$Result.GetResult<Prisma.$CareCirclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly actorId: FieldRef<"AuditLog", 'String'>
    readonly circleId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly resourceType: FieldRef<"AuditLog", 'String'>
    readonly resourceId: FieldRef<"AuditLog", 'String'>
    readonly metadata: FieldRef<"AuditLog", 'Json'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.circle
   */
  export type AuditLog$circleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareCircle
     */
    select?: CareCircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareCircle
     */
    omit?: CareCircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareCircleInclude<ExtArgs> | null
    where?: CareCircleWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CareCircleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    patientId: 'patientId',
    ownerId: 'ownerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CareCircleScalarFieldEnum = (typeof CareCircleScalarFieldEnum)[keyof typeof CareCircleScalarFieldEnum]


  export const CareCircleMemberScalarFieldEnum: {
    id: 'id',
    circleId: 'circleId',
    userId: 'userId',
    roleId: 'roleId',
    status: 'status',
    joinedAt: 'joinedAt',
    revokedAt: 'revokedAt'
  };

  export type CareCircleMemberScalarFieldEnum = (typeof CareCircleMemberScalarFieldEnum)[keyof typeof CareCircleMemberScalarFieldEnum]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const PermissionScalarFieldEnum: {
    id: 'id',
    key: 'key',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type PermissionScalarFieldEnum = (typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum]


  export const RolePermissionScalarFieldEnum: {
    roleId: 'roleId',
    permissionId: 'permissionId'
  };

  export type RolePermissionScalarFieldEnum = (typeof RolePermissionScalarFieldEnum)[keyof typeof RolePermissionScalarFieldEnum]


  export const InvitationScalarFieldEnum: {
    id: 'id',
    circleId: 'circleId',
    invitedById: 'invitedById',
    roleId: 'roleId',
    email: 'email',
    phone: 'phone',
    tokenHash: 'tokenHash',
    status: 'status',
    expiresAt: 'expiresAt',
    acceptedAt: 'acceptedAt',
    createdAt: 'createdAt'
  };

  export type InvitationScalarFieldEnum = (typeof InvitationScalarFieldEnum)[keyof typeof InvitationScalarFieldEnum]


  export const ConsentScalarFieldEnum: {
    id: 'id',
    circleId: 'circleId',
    memberId: 'memberId',
    grantedById: 'grantedById',
    status: 'status',
    scope: 'scope',
    grantedAt: 'grantedAt',
    revokedAt: 'revokedAt',
    expiresAt: 'expiresAt'
  };

  export type ConsentScalarFieldEnum = (typeof ConsentScalarFieldEnum)[keyof typeof ConsentScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    actorId: 'actorId',
    circleId: 'circleId',
    action: 'action',
    resourceType: 'resourceType',
    resourceId: 'resourceId',
    metadata: 'metadata',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'MemberStatus'
   */
  export type EnumMemberStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MemberStatus'>
    


  /**
   * Reference to a field of type 'MemberStatus[]'
   */
  export type ListEnumMemberStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MemberStatus[]'>
    


  /**
   * Reference to a field of type 'RoleName'
   */
  export type EnumRoleNameFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoleName'>
    


  /**
   * Reference to a field of type 'RoleName[]'
   */
  export type ListEnumRoleNameFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoleName[]'>
    


  /**
   * Reference to a field of type 'InvitationStatus'
   */
  export type EnumInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvitationStatus'>
    


  /**
   * Reference to a field of type 'InvitationStatus[]'
   */
  export type ListEnumInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvitationStatus[]'>
    


  /**
   * Reference to a field of type 'ConsentStatus'
   */
  export type EnumConsentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConsentStatus'>
    


  /**
   * Reference to a field of type 'ConsentStatus[]'
   */
  export type ListEnumConsentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConsentStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    patientCircles?: CareCircleListRelationFilter
    ownedCircles?: CareCircleListRelationFilter
    memberships?: CareCircleMemberListRelationFilter
    sentInvitations?: InvitationListRelationFilter
    consentsGranted?: ConsentListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientCircles?: CareCircleOrderByRelationAggregateInput
    ownedCircles?: CareCircleOrderByRelationAggregateInput
    memberships?: CareCircleMemberOrderByRelationAggregateInput
    sentInvitations?: InvitationOrderByRelationAggregateInput
    consentsGranted?: ConsentOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    patientCircles?: CareCircleListRelationFilter
    ownedCircles?: CareCircleListRelationFilter
    memberships?: CareCircleMemberListRelationFilter
    sentInvitations?: InvitationListRelationFilter
    consentsGranted?: ConsentListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "email" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CareCircleWhereInput = {
    AND?: CareCircleWhereInput | CareCircleWhereInput[]
    OR?: CareCircleWhereInput[]
    NOT?: CareCircleWhereInput | CareCircleWhereInput[]
    id?: UuidFilter<"CareCircle"> | string
    name?: StringFilter<"CareCircle"> | string
    patientId?: UuidFilter<"CareCircle"> | string
    ownerId?: UuidFilter<"CareCircle"> | string
    createdAt?: DateTimeFilter<"CareCircle"> | Date | string
    updatedAt?: DateTimeFilter<"CareCircle"> | Date | string
    patient?: XOR<UserScalarRelationFilter, UserWhereInput>
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    memberships?: CareCircleMemberListRelationFilter
    invitations?: InvitationListRelationFilter
    consents?: ConsentListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type CareCircleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    patientId?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patient?: UserOrderByWithRelationInput
    owner?: UserOrderByWithRelationInput
    memberships?: CareCircleMemberOrderByRelationAggregateInput
    invitations?: InvitationOrderByRelationAggregateInput
    consents?: ConsentOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type CareCircleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CareCircleWhereInput | CareCircleWhereInput[]
    OR?: CareCircleWhereInput[]
    NOT?: CareCircleWhereInput | CareCircleWhereInput[]
    name?: StringFilter<"CareCircle"> | string
    patientId?: UuidFilter<"CareCircle"> | string
    ownerId?: UuidFilter<"CareCircle"> | string
    createdAt?: DateTimeFilter<"CareCircle"> | Date | string
    updatedAt?: DateTimeFilter<"CareCircle"> | Date | string
    patient?: XOR<UserScalarRelationFilter, UserWhereInput>
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    memberships?: CareCircleMemberListRelationFilter
    invitations?: InvitationListRelationFilter
    consents?: ConsentListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id">

  export type CareCircleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    patientId?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CareCircleCountOrderByAggregateInput
    _max?: CareCircleMaxOrderByAggregateInput
    _min?: CareCircleMinOrderByAggregateInput
  }

  export type CareCircleScalarWhereWithAggregatesInput = {
    AND?: CareCircleScalarWhereWithAggregatesInput | CareCircleScalarWhereWithAggregatesInput[]
    OR?: CareCircleScalarWhereWithAggregatesInput[]
    NOT?: CareCircleScalarWhereWithAggregatesInput | CareCircleScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CareCircle"> | string
    name?: StringWithAggregatesFilter<"CareCircle"> | string
    patientId?: UuidWithAggregatesFilter<"CareCircle"> | string
    ownerId?: UuidWithAggregatesFilter<"CareCircle"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CareCircle"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CareCircle"> | Date | string
  }

  export type CareCircleMemberWhereInput = {
    AND?: CareCircleMemberWhereInput | CareCircleMemberWhereInput[]
    OR?: CareCircleMemberWhereInput[]
    NOT?: CareCircleMemberWhereInput | CareCircleMemberWhereInput[]
    id?: UuidFilter<"CareCircleMember"> | string
    circleId?: UuidFilter<"CareCircleMember"> | string
    userId?: UuidFilter<"CareCircleMember"> | string
    roleId?: UuidFilter<"CareCircleMember"> | string
    status?: EnumMemberStatusFilter<"CareCircleMember"> | $Enums.MemberStatus
    joinedAt?: DateTimeFilter<"CareCircleMember"> | Date | string
    revokedAt?: DateTimeNullableFilter<"CareCircleMember"> | Date | string | null
    circle?: XOR<CareCircleScalarRelationFilter, CareCircleWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    consents?: ConsentListRelationFilter
  }

  export type CareCircleMemberOrderByWithRelationInput = {
    id?: SortOrder
    circleId?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    circle?: CareCircleOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    role?: RoleOrderByWithRelationInput
    consents?: ConsentOrderByRelationAggregateInput
  }

  export type CareCircleMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    circleId_userId?: CareCircleMemberCircleIdUserIdCompoundUniqueInput
    AND?: CareCircleMemberWhereInput | CareCircleMemberWhereInput[]
    OR?: CareCircleMemberWhereInput[]
    NOT?: CareCircleMemberWhereInput | CareCircleMemberWhereInput[]
    circleId?: UuidFilter<"CareCircleMember"> | string
    userId?: UuidFilter<"CareCircleMember"> | string
    roleId?: UuidFilter<"CareCircleMember"> | string
    status?: EnumMemberStatusFilter<"CareCircleMember"> | $Enums.MemberStatus
    joinedAt?: DateTimeFilter<"CareCircleMember"> | Date | string
    revokedAt?: DateTimeNullableFilter<"CareCircleMember"> | Date | string | null
    circle?: XOR<CareCircleScalarRelationFilter, CareCircleWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    consents?: ConsentListRelationFilter
  }, "id" | "circleId_userId">

  export type CareCircleMemberOrderByWithAggregationInput = {
    id?: SortOrder
    circleId?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    _count?: CareCircleMemberCountOrderByAggregateInput
    _max?: CareCircleMemberMaxOrderByAggregateInput
    _min?: CareCircleMemberMinOrderByAggregateInput
  }

  export type CareCircleMemberScalarWhereWithAggregatesInput = {
    AND?: CareCircleMemberScalarWhereWithAggregatesInput | CareCircleMemberScalarWhereWithAggregatesInput[]
    OR?: CareCircleMemberScalarWhereWithAggregatesInput[]
    NOT?: CareCircleMemberScalarWhereWithAggregatesInput | CareCircleMemberScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CareCircleMember"> | string
    circleId?: UuidWithAggregatesFilter<"CareCircleMember"> | string
    userId?: UuidWithAggregatesFilter<"CareCircleMember"> | string
    roleId?: UuidWithAggregatesFilter<"CareCircleMember"> | string
    status?: EnumMemberStatusWithAggregatesFilter<"CareCircleMember"> | $Enums.MemberStatus
    joinedAt?: DateTimeWithAggregatesFilter<"CareCircleMember"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"CareCircleMember"> | Date | string | null
  }

  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: UuidFilter<"Role"> | string
    name?: EnumRoleNameFilter<"Role"> | $Enums.RoleName
    description?: StringNullableFilter<"Role"> | string | null
    createdAt?: DateTimeFilter<"Role"> | Date | string
    memberships?: CareCircleMemberListRelationFilter
    rolePermissions?: RolePermissionListRelationFilter
    invitations?: InvitationListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    memberships?: CareCircleMemberOrderByRelationAggregateInput
    rolePermissions?: RolePermissionOrderByRelationAggregateInput
    invitations?: InvitationOrderByRelationAggregateInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: $Enums.RoleName
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    description?: StringNullableFilter<"Role"> | string | null
    createdAt?: DateTimeFilter<"Role"> | Date | string
    memberships?: CareCircleMemberListRelationFilter
    rolePermissions?: RolePermissionListRelationFilter
    invitations?: InvitationListRelationFilter
  }, "id" | "name">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Role"> | string
    name?: EnumRoleNameWithAggregatesFilter<"Role"> | $Enums.RoleName
    description?: StringNullableWithAggregatesFilter<"Role"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
  }

  export type PermissionWhereInput = {
    AND?: PermissionWhereInput | PermissionWhereInput[]
    OR?: PermissionWhereInput[]
    NOT?: PermissionWhereInput | PermissionWhereInput[]
    id?: UuidFilter<"Permission"> | string
    key?: StringFilter<"Permission"> | string
    description?: StringNullableFilter<"Permission"> | string | null
    createdAt?: DateTimeFilter<"Permission"> | Date | string
    rolePermissions?: RolePermissionListRelationFilter
  }

  export type PermissionOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    rolePermissions?: RolePermissionOrderByRelationAggregateInput
  }

  export type PermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: PermissionWhereInput | PermissionWhereInput[]
    OR?: PermissionWhereInput[]
    NOT?: PermissionWhereInput | PermissionWhereInput[]
    description?: StringNullableFilter<"Permission"> | string | null
    createdAt?: DateTimeFilter<"Permission"> | Date | string
    rolePermissions?: RolePermissionListRelationFilter
  }, "id" | "key">

  export type PermissionOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PermissionCountOrderByAggregateInput
    _max?: PermissionMaxOrderByAggregateInput
    _min?: PermissionMinOrderByAggregateInput
  }

  export type PermissionScalarWhereWithAggregatesInput = {
    AND?: PermissionScalarWhereWithAggregatesInput | PermissionScalarWhereWithAggregatesInput[]
    OR?: PermissionScalarWhereWithAggregatesInput[]
    NOT?: PermissionScalarWhereWithAggregatesInput | PermissionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Permission"> | string
    key?: StringWithAggregatesFilter<"Permission"> | string
    description?: StringNullableWithAggregatesFilter<"Permission"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Permission"> | Date | string
  }

  export type RolePermissionWhereInput = {
    AND?: RolePermissionWhereInput | RolePermissionWhereInput[]
    OR?: RolePermissionWhereInput[]
    NOT?: RolePermissionWhereInput | RolePermissionWhereInput[]
    roleId?: UuidFilter<"RolePermission"> | string
    permissionId?: UuidFilter<"RolePermission"> | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    permission?: XOR<PermissionScalarRelationFilter, PermissionWhereInput>
  }

  export type RolePermissionOrderByWithRelationInput = {
    roleId?: SortOrder
    permissionId?: SortOrder
    role?: RoleOrderByWithRelationInput
    permission?: PermissionOrderByWithRelationInput
  }

  export type RolePermissionWhereUniqueInput = Prisma.AtLeast<{
    roleId_permissionId?: RolePermissionRoleIdPermissionIdCompoundUniqueInput
    AND?: RolePermissionWhereInput | RolePermissionWhereInput[]
    OR?: RolePermissionWhereInput[]
    NOT?: RolePermissionWhereInput | RolePermissionWhereInput[]
    roleId?: UuidFilter<"RolePermission"> | string
    permissionId?: UuidFilter<"RolePermission"> | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    permission?: XOR<PermissionScalarRelationFilter, PermissionWhereInput>
  }, "roleId_permissionId">

  export type RolePermissionOrderByWithAggregationInput = {
    roleId?: SortOrder
    permissionId?: SortOrder
    _count?: RolePermissionCountOrderByAggregateInput
    _max?: RolePermissionMaxOrderByAggregateInput
    _min?: RolePermissionMinOrderByAggregateInput
  }

  export type RolePermissionScalarWhereWithAggregatesInput = {
    AND?: RolePermissionScalarWhereWithAggregatesInput | RolePermissionScalarWhereWithAggregatesInput[]
    OR?: RolePermissionScalarWhereWithAggregatesInput[]
    NOT?: RolePermissionScalarWhereWithAggregatesInput | RolePermissionScalarWhereWithAggregatesInput[]
    roleId?: UuidWithAggregatesFilter<"RolePermission"> | string
    permissionId?: UuidWithAggregatesFilter<"RolePermission"> | string
  }

  export type InvitationWhereInput = {
    AND?: InvitationWhereInput | InvitationWhereInput[]
    OR?: InvitationWhereInput[]
    NOT?: InvitationWhereInput | InvitationWhereInput[]
    id?: UuidFilter<"Invitation"> | string
    circleId?: UuidFilter<"Invitation"> | string
    invitedById?: UuidFilter<"Invitation"> | string
    roleId?: UuidFilter<"Invitation"> | string
    email?: StringNullableFilter<"Invitation"> | string | null
    phone?: StringNullableFilter<"Invitation"> | string | null
    tokenHash?: StringFilter<"Invitation"> | string
    status?: EnumInvitationStatusFilter<"Invitation"> | $Enums.InvitationStatus
    expiresAt?: DateTimeFilter<"Invitation"> | Date | string
    acceptedAt?: DateTimeNullableFilter<"Invitation"> | Date | string | null
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    circle?: XOR<CareCircleScalarRelationFilter, CareCircleWhereInput>
    invitedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
  }

  export type InvitationOrderByWithRelationInput = {
    id?: SortOrder
    circleId?: SortOrder
    invitedById?: SortOrder
    roleId?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    tokenHash?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    circle?: CareCircleOrderByWithRelationInput
    invitedBy?: UserOrderByWithRelationInput
    role?: RoleOrderByWithRelationInput
  }

  export type InvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tokenHash?: string
    AND?: InvitationWhereInput | InvitationWhereInput[]
    OR?: InvitationWhereInput[]
    NOT?: InvitationWhereInput | InvitationWhereInput[]
    circleId?: UuidFilter<"Invitation"> | string
    invitedById?: UuidFilter<"Invitation"> | string
    roleId?: UuidFilter<"Invitation"> | string
    email?: StringNullableFilter<"Invitation"> | string | null
    phone?: StringNullableFilter<"Invitation"> | string | null
    status?: EnumInvitationStatusFilter<"Invitation"> | $Enums.InvitationStatus
    expiresAt?: DateTimeFilter<"Invitation"> | Date | string
    acceptedAt?: DateTimeNullableFilter<"Invitation"> | Date | string | null
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    circle?: XOR<CareCircleScalarRelationFilter, CareCircleWhereInput>
    invitedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
  }, "id" | "tokenHash">

  export type InvitationOrderByWithAggregationInput = {
    id?: SortOrder
    circleId?: SortOrder
    invitedById?: SortOrder
    roleId?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    tokenHash?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: InvitationCountOrderByAggregateInput
    _max?: InvitationMaxOrderByAggregateInput
    _min?: InvitationMinOrderByAggregateInput
  }

  export type InvitationScalarWhereWithAggregatesInput = {
    AND?: InvitationScalarWhereWithAggregatesInput | InvitationScalarWhereWithAggregatesInput[]
    OR?: InvitationScalarWhereWithAggregatesInput[]
    NOT?: InvitationScalarWhereWithAggregatesInput | InvitationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Invitation"> | string
    circleId?: UuidWithAggregatesFilter<"Invitation"> | string
    invitedById?: UuidWithAggregatesFilter<"Invitation"> | string
    roleId?: UuidWithAggregatesFilter<"Invitation"> | string
    email?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Invitation"> | string | null
    tokenHash?: StringWithAggregatesFilter<"Invitation"> | string
    status?: EnumInvitationStatusWithAggregatesFilter<"Invitation"> | $Enums.InvitationStatus
    expiresAt?: DateTimeWithAggregatesFilter<"Invitation"> | Date | string
    acceptedAt?: DateTimeNullableWithAggregatesFilter<"Invitation"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Invitation"> | Date | string
  }

  export type ConsentWhereInput = {
    AND?: ConsentWhereInput | ConsentWhereInput[]
    OR?: ConsentWhereInput[]
    NOT?: ConsentWhereInput | ConsentWhereInput[]
    id?: UuidFilter<"Consent"> | string
    circleId?: UuidFilter<"Consent"> | string
    memberId?: UuidFilter<"Consent"> | string
    grantedById?: UuidFilter<"Consent"> | string
    status?: EnumConsentStatusFilter<"Consent"> | $Enums.ConsentStatus
    scope?: JsonFilter<"Consent">
    grantedAt?: DateTimeFilter<"Consent"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Consent"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"Consent"> | Date | string | null
    circle?: XOR<CareCircleScalarRelationFilter, CareCircleWhereInput>
    member?: XOR<CareCircleMemberScalarRelationFilter, CareCircleMemberWhereInput>
    grantedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ConsentOrderByWithRelationInput = {
    id?: SortOrder
    circleId?: SortOrder
    memberId?: SortOrder
    grantedById?: SortOrder
    status?: SortOrder
    scope?: SortOrder
    grantedAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    circle?: CareCircleOrderByWithRelationInput
    member?: CareCircleMemberOrderByWithRelationInput
    grantedBy?: UserOrderByWithRelationInput
  }

  export type ConsentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConsentWhereInput | ConsentWhereInput[]
    OR?: ConsentWhereInput[]
    NOT?: ConsentWhereInput | ConsentWhereInput[]
    circleId?: UuidFilter<"Consent"> | string
    memberId?: UuidFilter<"Consent"> | string
    grantedById?: UuidFilter<"Consent"> | string
    status?: EnumConsentStatusFilter<"Consent"> | $Enums.ConsentStatus
    scope?: JsonFilter<"Consent">
    grantedAt?: DateTimeFilter<"Consent"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Consent"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"Consent"> | Date | string | null
    circle?: XOR<CareCircleScalarRelationFilter, CareCircleWhereInput>
    member?: XOR<CareCircleMemberScalarRelationFilter, CareCircleMemberWhereInput>
    grantedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ConsentOrderByWithAggregationInput = {
    id?: SortOrder
    circleId?: SortOrder
    memberId?: SortOrder
    grantedById?: SortOrder
    status?: SortOrder
    scope?: SortOrder
    grantedAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    _count?: ConsentCountOrderByAggregateInput
    _max?: ConsentMaxOrderByAggregateInput
    _min?: ConsentMinOrderByAggregateInput
  }

  export type ConsentScalarWhereWithAggregatesInput = {
    AND?: ConsentScalarWhereWithAggregatesInput | ConsentScalarWhereWithAggregatesInput[]
    OR?: ConsentScalarWhereWithAggregatesInput[]
    NOT?: ConsentScalarWhereWithAggregatesInput | ConsentScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Consent"> | string
    circleId?: UuidWithAggregatesFilter<"Consent"> | string
    memberId?: UuidWithAggregatesFilter<"Consent"> | string
    grantedById?: UuidWithAggregatesFilter<"Consent"> | string
    status?: EnumConsentStatusWithAggregatesFilter<"Consent"> | $Enums.ConsentStatus
    scope?: JsonWithAggregatesFilter<"Consent">
    grantedAt?: DateTimeWithAggregatesFilter<"Consent"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"Consent"> | Date | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Consent"> | Date | string | null
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: UuidFilter<"AuditLog"> | string
    actorId?: UuidFilter<"AuditLog"> | string
    circleId?: UuidNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    resourceType?: StringFilter<"AuditLog"> | string
    resourceId?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    actor?: XOR<UserScalarRelationFilter, UserWhereInput>
    circle?: XOR<CareCircleNullableScalarRelationFilter, CareCircleWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    actorId?: SortOrder
    circleId?: SortOrderInput | SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    actor?: UserOrderByWithRelationInput
    circle?: CareCircleOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    actorId?: UuidFilter<"AuditLog"> | string
    circleId?: UuidNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    resourceType?: StringFilter<"AuditLog"> | string
    resourceId?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    actor?: XOR<UserScalarRelationFilter, UserWhereInput>
    circle?: XOR<CareCircleNullableScalarRelationFilter, CareCircleWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    actorId?: SortOrder
    circleId?: SortOrderInput | SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"AuditLog"> | string
    actorId?: UuidWithAggregatesFilter<"AuditLog"> | string
    circleId?: UuidNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    resourceType?: StringWithAggregatesFilter<"AuditLog"> | string
    resourceId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"AuditLog">
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patientCircles?: CareCircleCreateNestedManyWithoutPatientInput
    ownedCircles?: CareCircleCreateNestedManyWithoutOwnerInput
    memberships?: CareCircleMemberCreateNestedManyWithoutUserInput
    sentInvitations?: InvitationCreateNestedManyWithoutInvitedByInput
    consentsGranted?: ConsentCreateNestedManyWithoutGrantedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patientCircles?: CareCircleUncheckedCreateNestedManyWithoutPatientInput
    ownedCircles?: CareCircleUncheckedCreateNestedManyWithoutOwnerInput
    memberships?: CareCircleMemberUncheckedCreateNestedManyWithoutUserInput
    sentInvitations?: InvitationUncheckedCreateNestedManyWithoutInvitedByInput
    consentsGranted?: ConsentUncheckedCreateNestedManyWithoutGrantedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientCircles?: CareCircleUpdateManyWithoutPatientNestedInput
    ownedCircles?: CareCircleUpdateManyWithoutOwnerNestedInput
    memberships?: CareCircleMemberUpdateManyWithoutUserNestedInput
    sentInvitations?: InvitationUpdateManyWithoutInvitedByNestedInput
    consentsGranted?: ConsentUpdateManyWithoutGrantedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientCircles?: CareCircleUncheckedUpdateManyWithoutPatientNestedInput
    ownedCircles?: CareCircleUncheckedUpdateManyWithoutOwnerNestedInput
    memberships?: CareCircleMemberUncheckedUpdateManyWithoutUserNestedInput
    sentInvitations?: InvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    consentsGranted?: ConsentUncheckedUpdateManyWithoutGrantedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareCircleCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: UserCreateNestedOneWithoutPatientCirclesInput
    owner: UserCreateNestedOneWithoutOwnedCirclesInput
    memberships?: CareCircleMemberCreateNestedManyWithoutCircleInput
    invitations?: InvitationCreateNestedManyWithoutCircleInput
    consents?: ConsentCreateNestedManyWithoutCircleInput
    auditLogs?: AuditLogCreateNestedManyWithoutCircleInput
  }

  export type CareCircleUncheckedCreateInput = {
    id?: string
    name: string
    patientId: string
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: CareCircleMemberUncheckedCreateNestedManyWithoutCircleInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCircleInput
    consents?: ConsentUncheckedCreateNestedManyWithoutCircleInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCircleInput
  }

  export type CareCircleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: UserUpdateOneRequiredWithoutPatientCirclesNestedInput
    owner?: UserUpdateOneRequiredWithoutOwnedCirclesNestedInput
    memberships?: CareCircleMemberUpdateManyWithoutCircleNestedInput
    invitations?: InvitationUpdateManyWithoutCircleNestedInput
    consents?: ConsentUpdateManyWithoutCircleNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCircleNestedInput
  }

  export type CareCircleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: CareCircleMemberUncheckedUpdateManyWithoutCircleNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutCircleNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutCircleNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCircleNestedInput
  }

  export type CareCircleCreateManyInput = {
    id?: string
    name: string
    patientId: string
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CareCircleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareCircleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareCircleMemberCreateInput = {
    id?: string
    status?: $Enums.MemberStatus
    joinedAt?: Date | string
    revokedAt?: Date | string | null
    circle: CareCircleCreateNestedOneWithoutMembershipsInput
    user: UserCreateNestedOneWithoutMembershipsInput
    role: RoleCreateNestedOneWithoutMembershipsInput
    consents?: ConsentCreateNestedManyWithoutMemberInput
  }

  export type CareCircleMemberUncheckedCreateInput = {
    id?: string
    circleId: string
    userId: string
    roleId: string
    status?: $Enums.MemberStatus
    joinedAt?: Date | string
    revokedAt?: Date | string | null
    consents?: ConsentUncheckedCreateNestedManyWithoutMemberInput
  }

  export type CareCircleMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    circle?: CareCircleUpdateOneRequiredWithoutMembershipsNestedInput
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
    role?: RoleUpdateOneRequiredWithoutMembershipsNestedInput
    consents?: ConsentUpdateManyWithoutMemberNestedInput
  }

  export type CareCircleMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consents?: ConsentUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type CareCircleMemberCreateManyInput = {
    id?: string
    circleId: string
    userId: string
    roleId: string
    status?: $Enums.MemberStatus
    joinedAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type CareCircleMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CareCircleMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RoleCreateInput = {
    id?: string
    name: $Enums.RoleName
    description?: string | null
    createdAt?: Date | string
    memberships?: CareCircleMemberCreateNestedManyWithoutRoleInput
    rolePermissions?: RolePermissionCreateNestedManyWithoutRoleInput
    invitations?: InvitationCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateInput = {
    id?: string
    name: $Enums.RoleName
    description?: string | null
    createdAt?: Date | string
    memberships?: CareCircleMemberUncheckedCreateNestedManyWithoutRoleInput
    rolePermissions?: RolePermissionUncheckedCreateNestedManyWithoutRoleInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumRoleNameFieldUpdateOperationsInput | $Enums.RoleName
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: CareCircleMemberUpdateManyWithoutRoleNestedInput
    rolePermissions?: RolePermissionUpdateManyWithoutRoleNestedInput
    invitations?: InvitationUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumRoleNameFieldUpdateOperationsInput | $Enums.RoleName
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: CareCircleMemberUncheckedUpdateManyWithoutRoleNestedInput
    rolePermissions?: RolePermissionUncheckedUpdateManyWithoutRoleNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleCreateManyInput = {
    id?: string
    name: $Enums.RoleName
    description?: string | null
    createdAt?: Date | string
  }

  export type RoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumRoleNameFieldUpdateOperationsInput | $Enums.RoleName
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumRoleNameFieldUpdateOperationsInput | $Enums.RoleName
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionCreateInput = {
    id?: string
    key: string
    description?: string | null
    createdAt?: Date | string
    rolePermissions?: RolePermissionCreateNestedManyWithoutPermissionInput
  }

  export type PermissionUncheckedCreateInput = {
    id?: string
    key: string
    description?: string | null
    createdAt?: Date | string
    rolePermissions?: RolePermissionUncheckedCreateNestedManyWithoutPermissionInput
  }

  export type PermissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissions?: RolePermissionUpdateManyWithoutPermissionNestedInput
  }

  export type PermissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissions?: RolePermissionUncheckedUpdateManyWithoutPermissionNestedInput
  }

  export type PermissionCreateManyInput = {
    id?: string
    key: string
    description?: string | null
    createdAt?: Date | string
  }

  export type PermissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionCreateInput = {
    role: RoleCreateNestedOneWithoutRolePermissionsInput
    permission: PermissionCreateNestedOneWithoutRolePermissionsInput
  }

  export type RolePermissionUncheckedCreateInput = {
    roleId: string
    permissionId: string
  }

  export type RolePermissionUpdateInput = {
    role?: RoleUpdateOneRequiredWithoutRolePermissionsNestedInput
    permission?: PermissionUpdateOneRequiredWithoutRolePermissionsNestedInput
  }

  export type RolePermissionUncheckedUpdateInput = {
    roleId?: StringFieldUpdateOperationsInput | string
    permissionId?: StringFieldUpdateOperationsInput | string
  }

  export type RolePermissionCreateManyInput = {
    roleId: string
    permissionId: string
  }

  export type RolePermissionUpdateManyMutationInput = {

  }

  export type RolePermissionUncheckedUpdateManyInput = {
    roleId?: StringFieldUpdateOperationsInput | string
    permissionId?: StringFieldUpdateOperationsInput | string
  }

  export type InvitationCreateInput = {
    id?: string
    email?: string | null
    phone?: string | null
    tokenHash: string
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
    circle: CareCircleCreateNestedOneWithoutInvitationsInput
    invitedBy: UserCreateNestedOneWithoutSentInvitationsInput
    role: RoleCreateNestedOneWithoutInvitationsInput
  }

  export type InvitationUncheckedCreateInput = {
    id?: string
    circleId: string
    invitedById: string
    roleId: string
    email?: string | null
    phone?: string | null
    tokenHash: string
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type InvitationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    tokenHash?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    circle?: CareCircleUpdateOneRequiredWithoutInvitationsNestedInput
    invitedBy?: UserUpdateOneRequiredWithoutSentInvitationsNestedInput
    role?: RoleUpdateOneRequiredWithoutInvitationsNestedInput
  }

  export type InvitationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    invitedById?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    tokenHash?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationCreateManyInput = {
    id?: string
    circleId: string
    invitedById: string
    roleId: string
    email?: string | null
    phone?: string | null
    tokenHash: string
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type InvitationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    tokenHash?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    invitedById?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    tokenHash?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentCreateInput = {
    id?: string
    status?: $Enums.ConsentStatus
    scope: JsonNullValueInput | InputJsonValue
    grantedAt?: Date | string
    revokedAt?: Date | string | null
    expiresAt?: Date | string | null
    circle: CareCircleCreateNestedOneWithoutConsentsInput
    member: CareCircleMemberCreateNestedOneWithoutConsentsInput
    grantedBy: UserCreateNestedOneWithoutConsentsGrantedInput
  }

  export type ConsentUncheckedCreateInput = {
    id?: string
    circleId: string
    memberId: string
    grantedById: string
    status?: $Enums.ConsentStatus
    scope: JsonNullValueInput | InputJsonValue
    grantedAt?: Date | string
    revokedAt?: Date | string | null
    expiresAt?: Date | string | null
  }

  export type ConsentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    scope?: JsonNullValueInput | InputJsonValue
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    circle?: CareCircleUpdateOneRequiredWithoutConsentsNestedInput
    member?: CareCircleMemberUpdateOneRequiredWithoutConsentsNestedInput
    grantedBy?: UserUpdateOneRequiredWithoutConsentsGrantedNestedInput
  }

  export type ConsentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    grantedById?: StringFieldUpdateOperationsInput | string
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    scope?: JsonNullValueInput | InputJsonValue
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConsentCreateManyInput = {
    id?: string
    circleId: string
    memberId: string
    grantedById: string
    status?: $Enums.ConsentStatus
    scope: JsonNullValueInput | InputJsonValue
    grantedAt?: Date | string
    revokedAt?: Date | string | null
    expiresAt?: Date | string | null
  }

  export type ConsentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    scope?: JsonNullValueInput | InputJsonValue
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConsentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    grantedById?: StringFieldUpdateOperationsInput | string
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    scope?: JsonNullValueInput | InputJsonValue
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    resourceType: string
    resourceId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    actor: UserCreateNestedOneWithoutAuditLogsInput
    circle?: CareCircleCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    actorId: string
    circleId?: string | null
    action: string
    resourceType: string
    resourceId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actor?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
    circle?: CareCircleUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    circleId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    actorId: string
    circleId?: string | null
    action: string
    resourceType: string
    resourceId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    circleId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CareCircleListRelationFilter = {
    every?: CareCircleWhereInput
    some?: CareCircleWhereInput
    none?: CareCircleWhereInput
  }

  export type CareCircleMemberListRelationFilter = {
    every?: CareCircleMemberWhereInput
    some?: CareCircleMemberWhereInput
    none?: CareCircleMemberWhereInput
  }

  export type InvitationListRelationFilter = {
    every?: InvitationWhereInput
    some?: InvitationWhereInput
    none?: InvitationWhereInput
  }

  export type ConsentListRelationFilter = {
    every?: ConsentWhereInput
    some?: ConsentWhereInput
    none?: ConsentWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CareCircleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CareCircleMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvitationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConsentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CareCircleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    patientId?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CareCircleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    patientId?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CareCircleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    patientId?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumMemberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberStatusFilter<$PrismaModel> | $Enums.MemberStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CareCircleScalarRelationFilter = {
    is?: CareCircleWhereInput
    isNot?: CareCircleWhereInput
  }

  export type RoleScalarRelationFilter = {
    is?: RoleWhereInput
    isNot?: RoleWhereInput
  }

  export type CareCircleMemberCircleIdUserIdCompoundUniqueInput = {
    circleId: string
    userId: string
  }

  export type CareCircleMemberCountOrderByAggregateInput = {
    id?: SortOrder
    circleId?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type CareCircleMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    circleId?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type CareCircleMemberMinOrderByAggregateInput = {
    id?: SortOrder
    circleId?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
    status?: SortOrder
    joinedAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type EnumMemberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberStatusWithAggregatesFilter<$PrismaModel> | $Enums.MemberStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMemberStatusFilter<$PrismaModel>
    _max?: NestedEnumMemberStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumRoleNameFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleName | EnumRoleNameFieldRefInput<$PrismaModel>
    in?: $Enums.RoleName[] | ListEnumRoleNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleName[] | ListEnumRoleNameFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleNameFilter<$PrismaModel> | $Enums.RoleName
  }

  export type RolePermissionListRelationFilter = {
    every?: RolePermissionWhereInput
    some?: RolePermissionWhereInput
    none?: RolePermissionWhereInput
  }

  export type RolePermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumRoleNameWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleName | EnumRoleNameFieldRefInput<$PrismaModel>
    in?: $Enums.RoleName[] | ListEnumRoleNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleName[] | ListEnumRoleNameFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleNameWithAggregatesFilter<$PrismaModel> | $Enums.RoleName
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleNameFilter<$PrismaModel>
    _max?: NestedEnumRoleNameFilter<$PrismaModel>
  }

  export type PermissionCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PermissionMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PermissionMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PermissionScalarRelationFilter = {
    is?: PermissionWhereInput
    isNot?: PermissionWhereInput
  }

  export type RolePermissionRoleIdPermissionIdCompoundUniqueInput = {
    roleId: string
    permissionId: string
  }

  export type RolePermissionCountOrderByAggregateInput = {
    roleId?: SortOrder
    permissionId?: SortOrder
  }

  export type RolePermissionMaxOrderByAggregateInput = {
    roleId?: SortOrder
    permissionId?: SortOrder
  }

  export type RolePermissionMinOrderByAggregateInput = {
    roleId?: SortOrder
    permissionId?: SortOrder
  }

  export type EnumInvitationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusFilter<$PrismaModel> | $Enums.InvitationStatus
  }

  export type InvitationCountOrderByAggregateInput = {
    id?: SortOrder
    circleId?: SortOrder
    invitedById?: SortOrder
    roleId?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    tokenHash?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    acceptedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type InvitationMaxOrderByAggregateInput = {
    id?: SortOrder
    circleId?: SortOrder
    invitedById?: SortOrder
    roleId?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    tokenHash?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    acceptedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type InvitationMinOrderByAggregateInput = {
    id?: SortOrder
    circleId?: SortOrder
    invitedById?: SortOrder
    roleId?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    tokenHash?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    acceptedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumInvitationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvitationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvitationStatusFilter<$PrismaModel>
    _max?: NestedEnumInvitationStatusFilter<$PrismaModel>
  }

  export type EnumConsentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsentStatus | EnumConsentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConsentStatus[] | ListEnumConsentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsentStatus[] | ListEnumConsentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConsentStatusFilter<$PrismaModel> | $Enums.ConsentStatus
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CareCircleMemberScalarRelationFilter = {
    is?: CareCircleMemberWhereInput
    isNot?: CareCircleMemberWhereInput
  }

  export type ConsentCountOrderByAggregateInput = {
    id?: SortOrder
    circleId?: SortOrder
    memberId?: SortOrder
    grantedById?: SortOrder
    status?: SortOrder
    scope?: SortOrder
    grantedAt?: SortOrder
    revokedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type ConsentMaxOrderByAggregateInput = {
    id?: SortOrder
    circleId?: SortOrder
    memberId?: SortOrder
    grantedById?: SortOrder
    status?: SortOrder
    grantedAt?: SortOrder
    revokedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type ConsentMinOrderByAggregateInput = {
    id?: SortOrder
    circleId?: SortOrder
    memberId?: SortOrder
    grantedById?: SortOrder
    status?: SortOrder
    grantedAt?: SortOrder
    revokedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type EnumConsentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsentStatus | EnumConsentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConsentStatus[] | ListEnumConsentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsentStatus[] | ListEnumConsentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConsentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConsentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConsentStatusFilter<$PrismaModel>
    _max?: NestedEnumConsentStatusFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CareCircleNullableScalarRelationFilter = {
    is?: CareCircleWhereInput | null
    isNot?: CareCircleWhereInput | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    actorId?: SortOrder
    circleId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    metadata?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    actorId?: SortOrder
    circleId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    actorId?: SortOrder
    circleId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type CareCircleCreateNestedManyWithoutPatientInput = {
    create?: XOR<CareCircleCreateWithoutPatientInput, CareCircleUncheckedCreateWithoutPatientInput> | CareCircleCreateWithoutPatientInput[] | CareCircleUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: CareCircleCreateOrConnectWithoutPatientInput | CareCircleCreateOrConnectWithoutPatientInput[]
    createMany?: CareCircleCreateManyPatientInputEnvelope
    connect?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
  }

  export type CareCircleCreateNestedManyWithoutOwnerInput = {
    create?: XOR<CareCircleCreateWithoutOwnerInput, CareCircleUncheckedCreateWithoutOwnerInput> | CareCircleCreateWithoutOwnerInput[] | CareCircleUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CareCircleCreateOrConnectWithoutOwnerInput | CareCircleCreateOrConnectWithoutOwnerInput[]
    createMany?: CareCircleCreateManyOwnerInputEnvelope
    connect?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
  }

  export type CareCircleMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<CareCircleMemberCreateWithoutUserInput, CareCircleMemberUncheckedCreateWithoutUserInput> | CareCircleMemberCreateWithoutUserInput[] | CareCircleMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CareCircleMemberCreateOrConnectWithoutUserInput | CareCircleMemberCreateOrConnectWithoutUserInput[]
    createMany?: CareCircleMemberCreateManyUserInputEnvelope
    connect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
  }

  export type InvitationCreateNestedManyWithoutInvitedByInput = {
    create?: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput> | InvitationCreateWithoutInvitedByInput[] | InvitationUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutInvitedByInput | InvitationCreateOrConnectWithoutInvitedByInput[]
    createMany?: InvitationCreateManyInvitedByInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type ConsentCreateNestedManyWithoutGrantedByInput = {
    create?: XOR<ConsentCreateWithoutGrantedByInput, ConsentUncheckedCreateWithoutGrantedByInput> | ConsentCreateWithoutGrantedByInput[] | ConsentUncheckedCreateWithoutGrantedByInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutGrantedByInput | ConsentCreateOrConnectWithoutGrantedByInput[]
    createMany?: ConsentCreateManyGrantedByInputEnvelope
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutActorInput = {
    create?: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput> | AuditLogCreateWithoutActorInput[] | AuditLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutActorInput | AuditLogCreateOrConnectWithoutActorInput[]
    createMany?: AuditLogCreateManyActorInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type CareCircleUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<CareCircleCreateWithoutPatientInput, CareCircleUncheckedCreateWithoutPatientInput> | CareCircleCreateWithoutPatientInput[] | CareCircleUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: CareCircleCreateOrConnectWithoutPatientInput | CareCircleCreateOrConnectWithoutPatientInput[]
    createMany?: CareCircleCreateManyPatientInputEnvelope
    connect?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
  }

  export type CareCircleUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<CareCircleCreateWithoutOwnerInput, CareCircleUncheckedCreateWithoutOwnerInput> | CareCircleCreateWithoutOwnerInput[] | CareCircleUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CareCircleCreateOrConnectWithoutOwnerInput | CareCircleCreateOrConnectWithoutOwnerInput[]
    createMany?: CareCircleCreateManyOwnerInputEnvelope
    connect?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
  }

  export type CareCircleMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CareCircleMemberCreateWithoutUserInput, CareCircleMemberUncheckedCreateWithoutUserInput> | CareCircleMemberCreateWithoutUserInput[] | CareCircleMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CareCircleMemberCreateOrConnectWithoutUserInput | CareCircleMemberCreateOrConnectWithoutUserInput[]
    createMany?: CareCircleMemberCreateManyUserInputEnvelope
    connect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
  }

  export type InvitationUncheckedCreateNestedManyWithoutInvitedByInput = {
    create?: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput> | InvitationCreateWithoutInvitedByInput[] | InvitationUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutInvitedByInput | InvitationCreateOrConnectWithoutInvitedByInput[]
    createMany?: InvitationCreateManyInvitedByInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type ConsentUncheckedCreateNestedManyWithoutGrantedByInput = {
    create?: XOR<ConsentCreateWithoutGrantedByInput, ConsentUncheckedCreateWithoutGrantedByInput> | ConsentCreateWithoutGrantedByInput[] | ConsentUncheckedCreateWithoutGrantedByInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutGrantedByInput | ConsentCreateOrConnectWithoutGrantedByInput[]
    createMany?: ConsentCreateManyGrantedByInputEnvelope
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutActorInput = {
    create?: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput> | AuditLogCreateWithoutActorInput[] | AuditLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutActorInput | AuditLogCreateOrConnectWithoutActorInput[]
    createMany?: AuditLogCreateManyActorInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CareCircleUpdateManyWithoutPatientNestedInput = {
    create?: XOR<CareCircleCreateWithoutPatientInput, CareCircleUncheckedCreateWithoutPatientInput> | CareCircleCreateWithoutPatientInput[] | CareCircleUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: CareCircleCreateOrConnectWithoutPatientInput | CareCircleCreateOrConnectWithoutPatientInput[]
    upsert?: CareCircleUpsertWithWhereUniqueWithoutPatientInput | CareCircleUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: CareCircleCreateManyPatientInputEnvelope
    set?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
    disconnect?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
    delete?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
    connect?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
    update?: CareCircleUpdateWithWhereUniqueWithoutPatientInput | CareCircleUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: CareCircleUpdateManyWithWhereWithoutPatientInput | CareCircleUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: CareCircleScalarWhereInput | CareCircleScalarWhereInput[]
  }

  export type CareCircleUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<CareCircleCreateWithoutOwnerInput, CareCircleUncheckedCreateWithoutOwnerInput> | CareCircleCreateWithoutOwnerInput[] | CareCircleUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CareCircleCreateOrConnectWithoutOwnerInput | CareCircleCreateOrConnectWithoutOwnerInput[]
    upsert?: CareCircleUpsertWithWhereUniqueWithoutOwnerInput | CareCircleUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: CareCircleCreateManyOwnerInputEnvelope
    set?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
    disconnect?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
    delete?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
    connect?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
    update?: CareCircleUpdateWithWhereUniqueWithoutOwnerInput | CareCircleUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: CareCircleUpdateManyWithWhereWithoutOwnerInput | CareCircleUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: CareCircleScalarWhereInput | CareCircleScalarWhereInput[]
  }

  export type CareCircleMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<CareCircleMemberCreateWithoutUserInput, CareCircleMemberUncheckedCreateWithoutUserInput> | CareCircleMemberCreateWithoutUserInput[] | CareCircleMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CareCircleMemberCreateOrConnectWithoutUserInput | CareCircleMemberCreateOrConnectWithoutUserInput[]
    upsert?: CareCircleMemberUpsertWithWhereUniqueWithoutUserInput | CareCircleMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CareCircleMemberCreateManyUserInputEnvelope
    set?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    disconnect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    delete?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    connect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    update?: CareCircleMemberUpdateWithWhereUniqueWithoutUserInput | CareCircleMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CareCircleMemberUpdateManyWithWhereWithoutUserInput | CareCircleMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CareCircleMemberScalarWhereInput | CareCircleMemberScalarWhereInput[]
  }

  export type InvitationUpdateManyWithoutInvitedByNestedInput = {
    create?: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput> | InvitationCreateWithoutInvitedByInput[] | InvitationUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutInvitedByInput | InvitationCreateOrConnectWithoutInvitedByInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutInvitedByInput | InvitationUpsertWithWhereUniqueWithoutInvitedByInput[]
    createMany?: InvitationCreateManyInvitedByInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutInvitedByInput | InvitationUpdateWithWhereUniqueWithoutInvitedByInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutInvitedByInput | InvitationUpdateManyWithWhereWithoutInvitedByInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type ConsentUpdateManyWithoutGrantedByNestedInput = {
    create?: XOR<ConsentCreateWithoutGrantedByInput, ConsentUncheckedCreateWithoutGrantedByInput> | ConsentCreateWithoutGrantedByInput[] | ConsentUncheckedCreateWithoutGrantedByInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutGrantedByInput | ConsentCreateOrConnectWithoutGrantedByInput[]
    upsert?: ConsentUpsertWithWhereUniqueWithoutGrantedByInput | ConsentUpsertWithWhereUniqueWithoutGrantedByInput[]
    createMany?: ConsentCreateManyGrantedByInputEnvelope
    set?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    disconnect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    delete?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    update?: ConsentUpdateWithWhereUniqueWithoutGrantedByInput | ConsentUpdateWithWhereUniqueWithoutGrantedByInput[]
    updateMany?: ConsentUpdateManyWithWhereWithoutGrantedByInput | ConsentUpdateManyWithWhereWithoutGrantedByInput[]
    deleteMany?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutActorNestedInput = {
    create?: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput> | AuditLogCreateWithoutActorInput[] | AuditLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutActorInput | AuditLogCreateOrConnectWithoutActorInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutActorInput | AuditLogUpsertWithWhereUniqueWithoutActorInput[]
    createMany?: AuditLogCreateManyActorInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutActorInput | AuditLogUpdateWithWhereUniqueWithoutActorInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutActorInput | AuditLogUpdateManyWithWhereWithoutActorInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type CareCircleUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<CareCircleCreateWithoutPatientInput, CareCircleUncheckedCreateWithoutPatientInput> | CareCircleCreateWithoutPatientInput[] | CareCircleUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: CareCircleCreateOrConnectWithoutPatientInput | CareCircleCreateOrConnectWithoutPatientInput[]
    upsert?: CareCircleUpsertWithWhereUniqueWithoutPatientInput | CareCircleUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: CareCircleCreateManyPatientInputEnvelope
    set?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
    disconnect?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
    delete?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
    connect?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
    update?: CareCircleUpdateWithWhereUniqueWithoutPatientInput | CareCircleUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: CareCircleUpdateManyWithWhereWithoutPatientInput | CareCircleUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: CareCircleScalarWhereInput | CareCircleScalarWhereInput[]
  }

  export type CareCircleUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<CareCircleCreateWithoutOwnerInput, CareCircleUncheckedCreateWithoutOwnerInput> | CareCircleCreateWithoutOwnerInput[] | CareCircleUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CareCircleCreateOrConnectWithoutOwnerInput | CareCircleCreateOrConnectWithoutOwnerInput[]
    upsert?: CareCircleUpsertWithWhereUniqueWithoutOwnerInput | CareCircleUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: CareCircleCreateManyOwnerInputEnvelope
    set?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
    disconnect?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
    delete?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
    connect?: CareCircleWhereUniqueInput | CareCircleWhereUniqueInput[]
    update?: CareCircleUpdateWithWhereUniqueWithoutOwnerInput | CareCircleUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: CareCircleUpdateManyWithWhereWithoutOwnerInput | CareCircleUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: CareCircleScalarWhereInput | CareCircleScalarWhereInput[]
  }

  export type CareCircleMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CareCircleMemberCreateWithoutUserInput, CareCircleMemberUncheckedCreateWithoutUserInput> | CareCircleMemberCreateWithoutUserInput[] | CareCircleMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CareCircleMemberCreateOrConnectWithoutUserInput | CareCircleMemberCreateOrConnectWithoutUserInput[]
    upsert?: CareCircleMemberUpsertWithWhereUniqueWithoutUserInput | CareCircleMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CareCircleMemberCreateManyUserInputEnvelope
    set?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    disconnect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    delete?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    connect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    update?: CareCircleMemberUpdateWithWhereUniqueWithoutUserInput | CareCircleMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CareCircleMemberUpdateManyWithWhereWithoutUserInput | CareCircleMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CareCircleMemberScalarWhereInput | CareCircleMemberScalarWhereInput[]
  }

  export type InvitationUncheckedUpdateManyWithoutInvitedByNestedInput = {
    create?: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput> | InvitationCreateWithoutInvitedByInput[] | InvitationUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutInvitedByInput | InvitationCreateOrConnectWithoutInvitedByInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutInvitedByInput | InvitationUpsertWithWhereUniqueWithoutInvitedByInput[]
    createMany?: InvitationCreateManyInvitedByInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutInvitedByInput | InvitationUpdateWithWhereUniqueWithoutInvitedByInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutInvitedByInput | InvitationUpdateManyWithWhereWithoutInvitedByInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type ConsentUncheckedUpdateManyWithoutGrantedByNestedInput = {
    create?: XOR<ConsentCreateWithoutGrantedByInput, ConsentUncheckedCreateWithoutGrantedByInput> | ConsentCreateWithoutGrantedByInput[] | ConsentUncheckedCreateWithoutGrantedByInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutGrantedByInput | ConsentCreateOrConnectWithoutGrantedByInput[]
    upsert?: ConsentUpsertWithWhereUniqueWithoutGrantedByInput | ConsentUpsertWithWhereUniqueWithoutGrantedByInput[]
    createMany?: ConsentCreateManyGrantedByInputEnvelope
    set?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    disconnect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    delete?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    update?: ConsentUpdateWithWhereUniqueWithoutGrantedByInput | ConsentUpdateWithWhereUniqueWithoutGrantedByInput[]
    updateMany?: ConsentUpdateManyWithWhereWithoutGrantedByInput | ConsentUpdateManyWithWhereWithoutGrantedByInput[]
    deleteMany?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutActorNestedInput = {
    create?: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput> | AuditLogCreateWithoutActorInput[] | AuditLogUncheckedCreateWithoutActorInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutActorInput | AuditLogCreateOrConnectWithoutActorInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutActorInput | AuditLogUpsertWithWhereUniqueWithoutActorInput[]
    createMany?: AuditLogCreateManyActorInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutActorInput | AuditLogUpdateWithWhereUniqueWithoutActorInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutActorInput | AuditLogUpdateManyWithWhereWithoutActorInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPatientCirclesInput = {
    create?: XOR<UserCreateWithoutPatientCirclesInput, UserUncheckedCreateWithoutPatientCirclesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientCirclesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOwnedCirclesInput = {
    create?: XOR<UserCreateWithoutOwnedCirclesInput, UserUncheckedCreateWithoutOwnedCirclesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedCirclesInput
    connect?: UserWhereUniqueInput
  }

  export type CareCircleMemberCreateNestedManyWithoutCircleInput = {
    create?: XOR<CareCircleMemberCreateWithoutCircleInput, CareCircleMemberUncheckedCreateWithoutCircleInput> | CareCircleMemberCreateWithoutCircleInput[] | CareCircleMemberUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: CareCircleMemberCreateOrConnectWithoutCircleInput | CareCircleMemberCreateOrConnectWithoutCircleInput[]
    createMany?: CareCircleMemberCreateManyCircleInputEnvelope
    connect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
  }

  export type InvitationCreateNestedManyWithoutCircleInput = {
    create?: XOR<InvitationCreateWithoutCircleInput, InvitationUncheckedCreateWithoutCircleInput> | InvitationCreateWithoutCircleInput[] | InvitationUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutCircleInput | InvitationCreateOrConnectWithoutCircleInput[]
    createMany?: InvitationCreateManyCircleInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type ConsentCreateNestedManyWithoutCircleInput = {
    create?: XOR<ConsentCreateWithoutCircleInput, ConsentUncheckedCreateWithoutCircleInput> | ConsentCreateWithoutCircleInput[] | ConsentUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutCircleInput | ConsentCreateOrConnectWithoutCircleInput[]
    createMany?: ConsentCreateManyCircleInputEnvelope
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutCircleInput = {
    create?: XOR<AuditLogCreateWithoutCircleInput, AuditLogUncheckedCreateWithoutCircleInput> | AuditLogCreateWithoutCircleInput[] | AuditLogUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutCircleInput | AuditLogCreateOrConnectWithoutCircleInput[]
    createMany?: AuditLogCreateManyCircleInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type CareCircleMemberUncheckedCreateNestedManyWithoutCircleInput = {
    create?: XOR<CareCircleMemberCreateWithoutCircleInput, CareCircleMemberUncheckedCreateWithoutCircleInput> | CareCircleMemberCreateWithoutCircleInput[] | CareCircleMemberUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: CareCircleMemberCreateOrConnectWithoutCircleInput | CareCircleMemberCreateOrConnectWithoutCircleInput[]
    createMany?: CareCircleMemberCreateManyCircleInputEnvelope
    connect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
  }

  export type InvitationUncheckedCreateNestedManyWithoutCircleInput = {
    create?: XOR<InvitationCreateWithoutCircleInput, InvitationUncheckedCreateWithoutCircleInput> | InvitationCreateWithoutCircleInput[] | InvitationUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutCircleInput | InvitationCreateOrConnectWithoutCircleInput[]
    createMany?: InvitationCreateManyCircleInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type ConsentUncheckedCreateNestedManyWithoutCircleInput = {
    create?: XOR<ConsentCreateWithoutCircleInput, ConsentUncheckedCreateWithoutCircleInput> | ConsentCreateWithoutCircleInput[] | ConsentUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutCircleInput | ConsentCreateOrConnectWithoutCircleInput[]
    createMany?: ConsentCreateManyCircleInputEnvelope
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutCircleInput = {
    create?: XOR<AuditLogCreateWithoutCircleInput, AuditLogUncheckedCreateWithoutCircleInput> | AuditLogCreateWithoutCircleInput[] | AuditLogUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutCircleInput | AuditLogCreateOrConnectWithoutCircleInput[]
    createMany?: AuditLogCreateManyCircleInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutPatientCirclesNestedInput = {
    create?: XOR<UserCreateWithoutPatientCirclesInput, UserUncheckedCreateWithoutPatientCirclesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientCirclesInput
    upsert?: UserUpsertWithoutPatientCirclesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPatientCirclesInput, UserUpdateWithoutPatientCirclesInput>, UserUncheckedUpdateWithoutPatientCirclesInput>
  }

  export type UserUpdateOneRequiredWithoutOwnedCirclesNestedInput = {
    create?: XOR<UserCreateWithoutOwnedCirclesInput, UserUncheckedCreateWithoutOwnedCirclesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedCirclesInput
    upsert?: UserUpsertWithoutOwnedCirclesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedCirclesInput, UserUpdateWithoutOwnedCirclesInput>, UserUncheckedUpdateWithoutOwnedCirclesInput>
  }

  export type CareCircleMemberUpdateManyWithoutCircleNestedInput = {
    create?: XOR<CareCircleMemberCreateWithoutCircleInput, CareCircleMemberUncheckedCreateWithoutCircleInput> | CareCircleMemberCreateWithoutCircleInput[] | CareCircleMemberUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: CareCircleMemberCreateOrConnectWithoutCircleInput | CareCircleMemberCreateOrConnectWithoutCircleInput[]
    upsert?: CareCircleMemberUpsertWithWhereUniqueWithoutCircleInput | CareCircleMemberUpsertWithWhereUniqueWithoutCircleInput[]
    createMany?: CareCircleMemberCreateManyCircleInputEnvelope
    set?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    disconnect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    delete?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    connect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    update?: CareCircleMemberUpdateWithWhereUniqueWithoutCircleInput | CareCircleMemberUpdateWithWhereUniqueWithoutCircleInput[]
    updateMany?: CareCircleMemberUpdateManyWithWhereWithoutCircleInput | CareCircleMemberUpdateManyWithWhereWithoutCircleInput[]
    deleteMany?: CareCircleMemberScalarWhereInput | CareCircleMemberScalarWhereInput[]
  }

  export type InvitationUpdateManyWithoutCircleNestedInput = {
    create?: XOR<InvitationCreateWithoutCircleInput, InvitationUncheckedCreateWithoutCircleInput> | InvitationCreateWithoutCircleInput[] | InvitationUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutCircleInput | InvitationCreateOrConnectWithoutCircleInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutCircleInput | InvitationUpsertWithWhereUniqueWithoutCircleInput[]
    createMany?: InvitationCreateManyCircleInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutCircleInput | InvitationUpdateWithWhereUniqueWithoutCircleInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutCircleInput | InvitationUpdateManyWithWhereWithoutCircleInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type ConsentUpdateManyWithoutCircleNestedInput = {
    create?: XOR<ConsentCreateWithoutCircleInput, ConsentUncheckedCreateWithoutCircleInput> | ConsentCreateWithoutCircleInput[] | ConsentUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutCircleInput | ConsentCreateOrConnectWithoutCircleInput[]
    upsert?: ConsentUpsertWithWhereUniqueWithoutCircleInput | ConsentUpsertWithWhereUniqueWithoutCircleInput[]
    createMany?: ConsentCreateManyCircleInputEnvelope
    set?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    disconnect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    delete?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    update?: ConsentUpdateWithWhereUniqueWithoutCircleInput | ConsentUpdateWithWhereUniqueWithoutCircleInput[]
    updateMany?: ConsentUpdateManyWithWhereWithoutCircleInput | ConsentUpdateManyWithWhereWithoutCircleInput[]
    deleteMany?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutCircleNestedInput = {
    create?: XOR<AuditLogCreateWithoutCircleInput, AuditLogUncheckedCreateWithoutCircleInput> | AuditLogCreateWithoutCircleInput[] | AuditLogUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutCircleInput | AuditLogCreateOrConnectWithoutCircleInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutCircleInput | AuditLogUpsertWithWhereUniqueWithoutCircleInput[]
    createMany?: AuditLogCreateManyCircleInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutCircleInput | AuditLogUpdateWithWhereUniqueWithoutCircleInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutCircleInput | AuditLogUpdateManyWithWhereWithoutCircleInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type CareCircleMemberUncheckedUpdateManyWithoutCircleNestedInput = {
    create?: XOR<CareCircleMemberCreateWithoutCircleInput, CareCircleMemberUncheckedCreateWithoutCircleInput> | CareCircleMemberCreateWithoutCircleInput[] | CareCircleMemberUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: CareCircleMemberCreateOrConnectWithoutCircleInput | CareCircleMemberCreateOrConnectWithoutCircleInput[]
    upsert?: CareCircleMemberUpsertWithWhereUniqueWithoutCircleInput | CareCircleMemberUpsertWithWhereUniqueWithoutCircleInput[]
    createMany?: CareCircleMemberCreateManyCircleInputEnvelope
    set?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    disconnect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    delete?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    connect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    update?: CareCircleMemberUpdateWithWhereUniqueWithoutCircleInput | CareCircleMemberUpdateWithWhereUniqueWithoutCircleInput[]
    updateMany?: CareCircleMemberUpdateManyWithWhereWithoutCircleInput | CareCircleMemberUpdateManyWithWhereWithoutCircleInput[]
    deleteMany?: CareCircleMemberScalarWhereInput | CareCircleMemberScalarWhereInput[]
  }

  export type InvitationUncheckedUpdateManyWithoutCircleNestedInput = {
    create?: XOR<InvitationCreateWithoutCircleInput, InvitationUncheckedCreateWithoutCircleInput> | InvitationCreateWithoutCircleInput[] | InvitationUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutCircleInput | InvitationCreateOrConnectWithoutCircleInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutCircleInput | InvitationUpsertWithWhereUniqueWithoutCircleInput[]
    createMany?: InvitationCreateManyCircleInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutCircleInput | InvitationUpdateWithWhereUniqueWithoutCircleInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutCircleInput | InvitationUpdateManyWithWhereWithoutCircleInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type ConsentUncheckedUpdateManyWithoutCircleNestedInput = {
    create?: XOR<ConsentCreateWithoutCircleInput, ConsentUncheckedCreateWithoutCircleInput> | ConsentCreateWithoutCircleInput[] | ConsentUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutCircleInput | ConsentCreateOrConnectWithoutCircleInput[]
    upsert?: ConsentUpsertWithWhereUniqueWithoutCircleInput | ConsentUpsertWithWhereUniqueWithoutCircleInput[]
    createMany?: ConsentCreateManyCircleInputEnvelope
    set?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    disconnect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    delete?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    update?: ConsentUpdateWithWhereUniqueWithoutCircleInput | ConsentUpdateWithWhereUniqueWithoutCircleInput[]
    updateMany?: ConsentUpdateManyWithWhereWithoutCircleInput | ConsentUpdateManyWithWhereWithoutCircleInput[]
    deleteMany?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutCircleNestedInput = {
    create?: XOR<AuditLogCreateWithoutCircleInput, AuditLogUncheckedCreateWithoutCircleInput> | AuditLogCreateWithoutCircleInput[] | AuditLogUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutCircleInput | AuditLogCreateOrConnectWithoutCircleInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutCircleInput | AuditLogUpsertWithWhereUniqueWithoutCircleInput[]
    createMany?: AuditLogCreateManyCircleInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutCircleInput | AuditLogUpdateWithWhereUniqueWithoutCircleInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutCircleInput | AuditLogUpdateManyWithWhereWithoutCircleInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type CareCircleCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<CareCircleCreateWithoutMembershipsInput, CareCircleUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: CareCircleCreateOrConnectWithoutMembershipsInput
    connect?: CareCircleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type RoleCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<RoleCreateWithoutMembershipsInput, RoleUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutMembershipsInput
    connect?: RoleWhereUniqueInput
  }

  export type ConsentCreateNestedManyWithoutMemberInput = {
    create?: XOR<ConsentCreateWithoutMemberInput, ConsentUncheckedCreateWithoutMemberInput> | ConsentCreateWithoutMemberInput[] | ConsentUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutMemberInput | ConsentCreateOrConnectWithoutMemberInput[]
    createMany?: ConsentCreateManyMemberInputEnvelope
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
  }

  export type ConsentUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<ConsentCreateWithoutMemberInput, ConsentUncheckedCreateWithoutMemberInput> | ConsentCreateWithoutMemberInput[] | ConsentUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutMemberInput | ConsentCreateOrConnectWithoutMemberInput[]
    createMany?: ConsentCreateManyMemberInputEnvelope
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
  }

  export type EnumMemberStatusFieldUpdateOperationsInput = {
    set?: $Enums.MemberStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CareCircleUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<CareCircleCreateWithoutMembershipsInput, CareCircleUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: CareCircleCreateOrConnectWithoutMembershipsInput
    upsert?: CareCircleUpsertWithoutMembershipsInput
    connect?: CareCircleWhereUniqueInput
    update?: XOR<XOR<CareCircleUpdateToOneWithWhereWithoutMembershipsInput, CareCircleUpdateWithoutMembershipsInput>, CareCircleUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    upsert?: UserUpsertWithoutMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMembershipsInput, UserUpdateWithoutMembershipsInput>, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type RoleUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<RoleCreateWithoutMembershipsInput, RoleUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutMembershipsInput
    upsert?: RoleUpsertWithoutMembershipsInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutMembershipsInput, RoleUpdateWithoutMembershipsInput>, RoleUncheckedUpdateWithoutMembershipsInput>
  }

  export type ConsentUpdateManyWithoutMemberNestedInput = {
    create?: XOR<ConsentCreateWithoutMemberInput, ConsentUncheckedCreateWithoutMemberInput> | ConsentCreateWithoutMemberInput[] | ConsentUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutMemberInput | ConsentCreateOrConnectWithoutMemberInput[]
    upsert?: ConsentUpsertWithWhereUniqueWithoutMemberInput | ConsentUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: ConsentCreateManyMemberInputEnvelope
    set?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    disconnect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    delete?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    update?: ConsentUpdateWithWhereUniqueWithoutMemberInput | ConsentUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: ConsentUpdateManyWithWhereWithoutMemberInput | ConsentUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
  }

  export type ConsentUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<ConsentCreateWithoutMemberInput, ConsentUncheckedCreateWithoutMemberInput> | ConsentCreateWithoutMemberInput[] | ConsentUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutMemberInput | ConsentCreateOrConnectWithoutMemberInput[]
    upsert?: ConsentUpsertWithWhereUniqueWithoutMemberInput | ConsentUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: ConsentCreateManyMemberInputEnvelope
    set?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    disconnect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    delete?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    update?: ConsentUpdateWithWhereUniqueWithoutMemberInput | ConsentUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: ConsentUpdateManyWithWhereWithoutMemberInput | ConsentUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
  }

  export type CareCircleMemberCreateNestedManyWithoutRoleInput = {
    create?: XOR<CareCircleMemberCreateWithoutRoleInput, CareCircleMemberUncheckedCreateWithoutRoleInput> | CareCircleMemberCreateWithoutRoleInput[] | CareCircleMemberUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: CareCircleMemberCreateOrConnectWithoutRoleInput | CareCircleMemberCreateOrConnectWithoutRoleInput[]
    createMany?: CareCircleMemberCreateManyRoleInputEnvelope
    connect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
  }

  export type RolePermissionCreateNestedManyWithoutRoleInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[]
    createMany?: RolePermissionCreateManyRoleInputEnvelope
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
  }

  export type InvitationCreateNestedManyWithoutRoleInput = {
    create?: XOR<InvitationCreateWithoutRoleInput, InvitationUncheckedCreateWithoutRoleInput> | InvitationCreateWithoutRoleInput[] | InvitationUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutRoleInput | InvitationCreateOrConnectWithoutRoleInput[]
    createMany?: InvitationCreateManyRoleInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type CareCircleMemberUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<CareCircleMemberCreateWithoutRoleInput, CareCircleMemberUncheckedCreateWithoutRoleInput> | CareCircleMemberCreateWithoutRoleInput[] | CareCircleMemberUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: CareCircleMemberCreateOrConnectWithoutRoleInput | CareCircleMemberCreateOrConnectWithoutRoleInput[]
    createMany?: CareCircleMemberCreateManyRoleInputEnvelope
    connect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
  }

  export type RolePermissionUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[]
    createMany?: RolePermissionCreateManyRoleInputEnvelope
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
  }

  export type InvitationUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<InvitationCreateWithoutRoleInput, InvitationUncheckedCreateWithoutRoleInput> | InvitationCreateWithoutRoleInput[] | InvitationUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutRoleInput | InvitationCreateOrConnectWithoutRoleInput[]
    createMany?: InvitationCreateManyRoleInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type EnumRoleNameFieldUpdateOperationsInput = {
    set?: $Enums.RoleName
  }

  export type CareCircleMemberUpdateManyWithoutRoleNestedInput = {
    create?: XOR<CareCircleMemberCreateWithoutRoleInput, CareCircleMemberUncheckedCreateWithoutRoleInput> | CareCircleMemberCreateWithoutRoleInput[] | CareCircleMemberUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: CareCircleMemberCreateOrConnectWithoutRoleInput | CareCircleMemberCreateOrConnectWithoutRoleInput[]
    upsert?: CareCircleMemberUpsertWithWhereUniqueWithoutRoleInput | CareCircleMemberUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: CareCircleMemberCreateManyRoleInputEnvelope
    set?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    disconnect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    delete?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    connect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    update?: CareCircleMemberUpdateWithWhereUniqueWithoutRoleInput | CareCircleMemberUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: CareCircleMemberUpdateManyWithWhereWithoutRoleInput | CareCircleMemberUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: CareCircleMemberScalarWhereInput | CareCircleMemberScalarWhereInput[]
  }

  export type RolePermissionUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[]
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutRoleInput | RolePermissionUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RolePermissionCreateManyRoleInputEnvelope
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    update?: RolePermissionUpdateWithWhereUniqueWithoutRoleInput | RolePermissionUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RolePermissionUpdateManyWithWhereWithoutRoleInput | RolePermissionUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
  }

  export type InvitationUpdateManyWithoutRoleNestedInput = {
    create?: XOR<InvitationCreateWithoutRoleInput, InvitationUncheckedCreateWithoutRoleInput> | InvitationCreateWithoutRoleInput[] | InvitationUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutRoleInput | InvitationCreateOrConnectWithoutRoleInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutRoleInput | InvitationUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: InvitationCreateManyRoleInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutRoleInput | InvitationUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutRoleInput | InvitationUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type CareCircleMemberUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<CareCircleMemberCreateWithoutRoleInput, CareCircleMemberUncheckedCreateWithoutRoleInput> | CareCircleMemberCreateWithoutRoleInput[] | CareCircleMemberUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: CareCircleMemberCreateOrConnectWithoutRoleInput | CareCircleMemberCreateOrConnectWithoutRoleInput[]
    upsert?: CareCircleMemberUpsertWithWhereUniqueWithoutRoleInput | CareCircleMemberUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: CareCircleMemberCreateManyRoleInputEnvelope
    set?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    disconnect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    delete?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    connect?: CareCircleMemberWhereUniqueInput | CareCircleMemberWhereUniqueInput[]
    update?: CareCircleMemberUpdateWithWhereUniqueWithoutRoleInput | CareCircleMemberUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: CareCircleMemberUpdateManyWithWhereWithoutRoleInput | CareCircleMemberUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: CareCircleMemberScalarWhereInput | CareCircleMemberScalarWhereInput[]
  }

  export type RolePermissionUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[]
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutRoleInput | RolePermissionUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RolePermissionCreateManyRoleInputEnvelope
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    update?: RolePermissionUpdateWithWhereUniqueWithoutRoleInput | RolePermissionUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RolePermissionUpdateManyWithWhereWithoutRoleInput | RolePermissionUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
  }

  export type InvitationUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<InvitationCreateWithoutRoleInput, InvitationUncheckedCreateWithoutRoleInput> | InvitationCreateWithoutRoleInput[] | InvitationUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutRoleInput | InvitationCreateOrConnectWithoutRoleInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutRoleInput | InvitationUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: InvitationCreateManyRoleInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutRoleInput | InvitationUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutRoleInput | InvitationUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type RolePermissionCreateNestedManyWithoutPermissionInput = {
    create?: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput> | RolePermissionCreateWithoutPermissionInput[] | RolePermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutPermissionInput | RolePermissionCreateOrConnectWithoutPermissionInput[]
    createMany?: RolePermissionCreateManyPermissionInputEnvelope
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
  }

  export type RolePermissionUncheckedCreateNestedManyWithoutPermissionInput = {
    create?: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput> | RolePermissionCreateWithoutPermissionInput[] | RolePermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutPermissionInput | RolePermissionCreateOrConnectWithoutPermissionInput[]
    createMany?: RolePermissionCreateManyPermissionInputEnvelope
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
  }

  export type RolePermissionUpdateManyWithoutPermissionNestedInput = {
    create?: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput> | RolePermissionCreateWithoutPermissionInput[] | RolePermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutPermissionInput | RolePermissionCreateOrConnectWithoutPermissionInput[]
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutPermissionInput | RolePermissionUpsertWithWhereUniqueWithoutPermissionInput[]
    createMany?: RolePermissionCreateManyPermissionInputEnvelope
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    update?: RolePermissionUpdateWithWhereUniqueWithoutPermissionInput | RolePermissionUpdateWithWhereUniqueWithoutPermissionInput[]
    updateMany?: RolePermissionUpdateManyWithWhereWithoutPermissionInput | RolePermissionUpdateManyWithWhereWithoutPermissionInput[]
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
  }

  export type RolePermissionUncheckedUpdateManyWithoutPermissionNestedInput = {
    create?: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput> | RolePermissionCreateWithoutPermissionInput[] | RolePermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutPermissionInput | RolePermissionCreateOrConnectWithoutPermissionInput[]
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutPermissionInput | RolePermissionUpsertWithWhereUniqueWithoutPermissionInput[]
    createMany?: RolePermissionCreateManyPermissionInputEnvelope
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    update?: RolePermissionUpdateWithWhereUniqueWithoutPermissionInput | RolePermissionUpdateWithWhereUniqueWithoutPermissionInput[]
    updateMany?: RolePermissionUpdateManyWithWhereWithoutPermissionInput | RolePermissionUpdateManyWithWhereWithoutPermissionInput[]
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
  }

  export type RoleCreateNestedOneWithoutRolePermissionsInput = {
    create?: XOR<RoleCreateWithoutRolePermissionsInput, RoleUncheckedCreateWithoutRolePermissionsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutRolePermissionsInput
    connect?: RoleWhereUniqueInput
  }

  export type PermissionCreateNestedOneWithoutRolePermissionsInput = {
    create?: XOR<PermissionCreateWithoutRolePermissionsInput, PermissionUncheckedCreateWithoutRolePermissionsInput>
    connectOrCreate?: PermissionCreateOrConnectWithoutRolePermissionsInput
    connect?: PermissionWhereUniqueInput
  }

  export type RoleUpdateOneRequiredWithoutRolePermissionsNestedInput = {
    create?: XOR<RoleCreateWithoutRolePermissionsInput, RoleUncheckedCreateWithoutRolePermissionsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutRolePermissionsInput
    upsert?: RoleUpsertWithoutRolePermissionsInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutRolePermissionsInput, RoleUpdateWithoutRolePermissionsInput>, RoleUncheckedUpdateWithoutRolePermissionsInput>
  }

  export type PermissionUpdateOneRequiredWithoutRolePermissionsNestedInput = {
    create?: XOR<PermissionCreateWithoutRolePermissionsInput, PermissionUncheckedCreateWithoutRolePermissionsInput>
    connectOrCreate?: PermissionCreateOrConnectWithoutRolePermissionsInput
    upsert?: PermissionUpsertWithoutRolePermissionsInput
    connect?: PermissionWhereUniqueInput
    update?: XOR<XOR<PermissionUpdateToOneWithWhereWithoutRolePermissionsInput, PermissionUpdateWithoutRolePermissionsInput>, PermissionUncheckedUpdateWithoutRolePermissionsInput>
  }

  export type CareCircleCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<CareCircleCreateWithoutInvitationsInput, CareCircleUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: CareCircleCreateOrConnectWithoutInvitationsInput
    connect?: CareCircleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSentInvitationsInput = {
    create?: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type RoleCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<RoleCreateWithoutInvitationsInput, RoleUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutInvitationsInput
    connect?: RoleWhereUniqueInput
  }

  export type EnumInvitationStatusFieldUpdateOperationsInput = {
    set?: $Enums.InvitationStatus
  }

  export type CareCircleUpdateOneRequiredWithoutInvitationsNestedInput = {
    create?: XOR<CareCircleCreateWithoutInvitationsInput, CareCircleUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: CareCircleCreateOrConnectWithoutInvitationsInput
    upsert?: CareCircleUpsertWithoutInvitationsInput
    connect?: CareCircleWhereUniqueInput
    update?: XOR<XOR<CareCircleUpdateToOneWithWhereWithoutInvitationsInput, CareCircleUpdateWithoutInvitationsInput>, CareCircleUncheckedUpdateWithoutInvitationsInput>
  }

  export type UserUpdateOneRequiredWithoutSentInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentInvitationsInput
    upsert?: UserUpsertWithoutSentInvitationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentInvitationsInput, UserUpdateWithoutSentInvitationsInput>, UserUncheckedUpdateWithoutSentInvitationsInput>
  }

  export type RoleUpdateOneRequiredWithoutInvitationsNestedInput = {
    create?: XOR<RoleCreateWithoutInvitationsInput, RoleUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutInvitationsInput
    upsert?: RoleUpsertWithoutInvitationsInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutInvitationsInput, RoleUpdateWithoutInvitationsInput>, RoleUncheckedUpdateWithoutInvitationsInput>
  }

  export type CareCircleCreateNestedOneWithoutConsentsInput = {
    create?: XOR<CareCircleCreateWithoutConsentsInput, CareCircleUncheckedCreateWithoutConsentsInput>
    connectOrCreate?: CareCircleCreateOrConnectWithoutConsentsInput
    connect?: CareCircleWhereUniqueInput
  }

  export type CareCircleMemberCreateNestedOneWithoutConsentsInput = {
    create?: XOR<CareCircleMemberCreateWithoutConsentsInput, CareCircleMemberUncheckedCreateWithoutConsentsInput>
    connectOrCreate?: CareCircleMemberCreateOrConnectWithoutConsentsInput
    connect?: CareCircleMemberWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutConsentsGrantedInput = {
    create?: XOR<UserCreateWithoutConsentsGrantedInput, UserUncheckedCreateWithoutConsentsGrantedInput>
    connectOrCreate?: UserCreateOrConnectWithoutConsentsGrantedInput
    connect?: UserWhereUniqueInput
  }

  export type EnumConsentStatusFieldUpdateOperationsInput = {
    set?: $Enums.ConsentStatus
  }

  export type CareCircleUpdateOneRequiredWithoutConsentsNestedInput = {
    create?: XOR<CareCircleCreateWithoutConsentsInput, CareCircleUncheckedCreateWithoutConsentsInput>
    connectOrCreate?: CareCircleCreateOrConnectWithoutConsentsInput
    upsert?: CareCircleUpsertWithoutConsentsInput
    connect?: CareCircleWhereUniqueInput
    update?: XOR<XOR<CareCircleUpdateToOneWithWhereWithoutConsentsInput, CareCircleUpdateWithoutConsentsInput>, CareCircleUncheckedUpdateWithoutConsentsInput>
  }

  export type CareCircleMemberUpdateOneRequiredWithoutConsentsNestedInput = {
    create?: XOR<CareCircleMemberCreateWithoutConsentsInput, CareCircleMemberUncheckedCreateWithoutConsentsInput>
    connectOrCreate?: CareCircleMemberCreateOrConnectWithoutConsentsInput
    upsert?: CareCircleMemberUpsertWithoutConsentsInput
    connect?: CareCircleMemberWhereUniqueInput
    update?: XOR<XOR<CareCircleMemberUpdateToOneWithWhereWithoutConsentsInput, CareCircleMemberUpdateWithoutConsentsInput>, CareCircleMemberUncheckedUpdateWithoutConsentsInput>
  }

  export type UserUpdateOneRequiredWithoutConsentsGrantedNestedInput = {
    create?: XOR<UserCreateWithoutConsentsGrantedInput, UserUncheckedCreateWithoutConsentsGrantedInput>
    connectOrCreate?: UserCreateOrConnectWithoutConsentsGrantedInput
    upsert?: UserUpsertWithoutConsentsGrantedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConsentsGrantedInput, UserUpdateWithoutConsentsGrantedInput>, UserUncheckedUpdateWithoutConsentsGrantedInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type CareCircleCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<CareCircleCreateWithoutAuditLogsInput, CareCircleUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: CareCircleCreateOrConnectWithoutAuditLogsInput
    connect?: CareCircleWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type CareCircleUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<CareCircleCreateWithoutAuditLogsInput, CareCircleUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: CareCircleCreateOrConnectWithoutAuditLogsInput
    upsert?: CareCircleUpsertWithoutAuditLogsInput
    disconnect?: CareCircleWhereInput | boolean
    delete?: CareCircleWhereInput | boolean
    connect?: CareCircleWhereUniqueInput
    update?: XOR<XOR<CareCircleUpdateToOneWithWhereWithoutAuditLogsInput, CareCircleUpdateWithoutAuditLogsInput>, CareCircleUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumMemberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberStatusFilter<$PrismaModel> | $Enums.MemberStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumMemberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberStatusWithAggregatesFilter<$PrismaModel> | $Enums.MemberStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMemberStatusFilter<$PrismaModel>
    _max?: NestedEnumMemberStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleNameFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleName | EnumRoleNameFieldRefInput<$PrismaModel>
    in?: $Enums.RoleName[] | ListEnumRoleNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleName[] | ListEnumRoleNameFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleNameFilter<$PrismaModel> | $Enums.RoleName
  }

  export type NestedEnumRoleNameWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleName | EnumRoleNameFieldRefInput<$PrismaModel>
    in?: $Enums.RoleName[] | ListEnumRoleNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleName[] | ListEnumRoleNameFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleNameWithAggregatesFilter<$PrismaModel> | $Enums.RoleName
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleNameFilter<$PrismaModel>
    _max?: NestedEnumRoleNameFilter<$PrismaModel>
  }

  export type NestedEnumInvitationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusFilter<$PrismaModel> | $Enums.InvitationStatus
  }

  export type NestedEnumInvitationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationStatus | EnumInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationStatus[] | ListEnumInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvitationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvitationStatusFilter<$PrismaModel>
    _max?: NestedEnumInvitationStatusFilter<$PrismaModel>
  }

  export type NestedEnumConsentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsentStatus | EnumConsentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConsentStatus[] | ListEnumConsentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsentStatus[] | ListEnumConsentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConsentStatusFilter<$PrismaModel> | $Enums.ConsentStatus
  }

  export type NestedEnumConsentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsentStatus | EnumConsentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConsentStatus[] | ListEnumConsentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsentStatus[] | ListEnumConsentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConsentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConsentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConsentStatusFilter<$PrismaModel>
    _max?: NestedEnumConsentStatusFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CareCircleCreateWithoutPatientInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedCirclesInput
    memberships?: CareCircleMemberCreateNestedManyWithoutCircleInput
    invitations?: InvitationCreateNestedManyWithoutCircleInput
    consents?: ConsentCreateNestedManyWithoutCircleInput
    auditLogs?: AuditLogCreateNestedManyWithoutCircleInput
  }

  export type CareCircleUncheckedCreateWithoutPatientInput = {
    id?: string
    name: string
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: CareCircleMemberUncheckedCreateNestedManyWithoutCircleInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCircleInput
    consents?: ConsentUncheckedCreateNestedManyWithoutCircleInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCircleInput
  }

  export type CareCircleCreateOrConnectWithoutPatientInput = {
    where: CareCircleWhereUniqueInput
    create: XOR<CareCircleCreateWithoutPatientInput, CareCircleUncheckedCreateWithoutPatientInput>
  }

  export type CareCircleCreateManyPatientInputEnvelope = {
    data: CareCircleCreateManyPatientInput | CareCircleCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type CareCircleCreateWithoutOwnerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: UserCreateNestedOneWithoutPatientCirclesInput
    memberships?: CareCircleMemberCreateNestedManyWithoutCircleInput
    invitations?: InvitationCreateNestedManyWithoutCircleInput
    consents?: ConsentCreateNestedManyWithoutCircleInput
    auditLogs?: AuditLogCreateNestedManyWithoutCircleInput
  }

  export type CareCircleUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    patientId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: CareCircleMemberUncheckedCreateNestedManyWithoutCircleInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCircleInput
    consents?: ConsentUncheckedCreateNestedManyWithoutCircleInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCircleInput
  }

  export type CareCircleCreateOrConnectWithoutOwnerInput = {
    where: CareCircleWhereUniqueInput
    create: XOR<CareCircleCreateWithoutOwnerInput, CareCircleUncheckedCreateWithoutOwnerInput>
  }

  export type CareCircleCreateManyOwnerInputEnvelope = {
    data: CareCircleCreateManyOwnerInput | CareCircleCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type CareCircleMemberCreateWithoutUserInput = {
    id?: string
    status?: $Enums.MemberStatus
    joinedAt?: Date | string
    revokedAt?: Date | string | null
    circle: CareCircleCreateNestedOneWithoutMembershipsInput
    role: RoleCreateNestedOneWithoutMembershipsInput
    consents?: ConsentCreateNestedManyWithoutMemberInput
  }

  export type CareCircleMemberUncheckedCreateWithoutUserInput = {
    id?: string
    circleId: string
    roleId: string
    status?: $Enums.MemberStatus
    joinedAt?: Date | string
    revokedAt?: Date | string | null
    consents?: ConsentUncheckedCreateNestedManyWithoutMemberInput
  }

  export type CareCircleMemberCreateOrConnectWithoutUserInput = {
    where: CareCircleMemberWhereUniqueInput
    create: XOR<CareCircleMemberCreateWithoutUserInput, CareCircleMemberUncheckedCreateWithoutUserInput>
  }

  export type CareCircleMemberCreateManyUserInputEnvelope = {
    data: CareCircleMemberCreateManyUserInput | CareCircleMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type InvitationCreateWithoutInvitedByInput = {
    id?: string
    email?: string | null
    phone?: string | null
    tokenHash: string
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
    circle: CareCircleCreateNestedOneWithoutInvitationsInput
    role: RoleCreateNestedOneWithoutInvitationsInput
  }

  export type InvitationUncheckedCreateWithoutInvitedByInput = {
    id?: string
    circleId: string
    roleId: string
    email?: string | null
    phone?: string | null
    tokenHash: string
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type InvitationCreateOrConnectWithoutInvitedByInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput>
  }

  export type InvitationCreateManyInvitedByInputEnvelope = {
    data: InvitationCreateManyInvitedByInput | InvitationCreateManyInvitedByInput[]
    skipDuplicates?: boolean
  }

  export type ConsentCreateWithoutGrantedByInput = {
    id?: string
    status?: $Enums.ConsentStatus
    scope: JsonNullValueInput | InputJsonValue
    grantedAt?: Date | string
    revokedAt?: Date | string | null
    expiresAt?: Date | string | null
    circle: CareCircleCreateNestedOneWithoutConsentsInput
    member: CareCircleMemberCreateNestedOneWithoutConsentsInput
  }

  export type ConsentUncheckedCreateWithoutGrantedByInput = {
    id?: string
    circleId: string
    memberId: string
    status?: $Enums.ConsentStatus
    scope: JsonNullValueInput | InputJsonValue
    grantedAt?: Date | string
    revokedAt?: Date | string | null
    expiresAt?: Date | string | null
  }

  export type ConsentCreateOrConnectWithoutGrantedByInput = {
    where: ConsentWhereUniqueInput
    create: XOR<ConsentCreateWithoutGrantedByInput, ConsentUncheckedCreateWithoutGrantedByInput>
  }

  export type ConsentCreateManyGrantedByInputEnvelope = {
    data: ConsentCreateManyGrantedByInput | ConsentCreateManyGrantedByInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutActorInput = {
    id?: string
    action: string
    resourceType: string
    resourceId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    circle?: CareCircleCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutActorInput = {
    id?: string
    circleId?: string | null
    action: string
    resourceType: string
    resourceId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutActorInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput>
  }

  export type AuditLogCreateManyActorInputEnvelope = {
    data: AuditLogCreateManyActorInput | AuditLogCreateManyActorInput[]
    skipDuplicates?: boolean
  }

  export type CareCircleUpsertWithWhereUniqueWithoutPatientInput = {
    where: CareCircleWhereUniqueInput
    update: XOR<CareCircleUpdateWithoutPatientInput, CareCircleUncheckedUpdateWithoutPatientInput>
    create: XOR<CareCircleCreateWithoutPatientInput, CareCircleUncheckedCreateWithoutPatientInput>
  }

  export type CareCircleUpdateWithWhereUniqueWithoutPatientInput = {
    where: CareCircleWhereUniqueInput
    data: XOR<CareCircleUpdateWithoutPatientInput, CareCircleUncheckedUpdateWithoutPatientInput>
  }

  export type CareCircleUpdateManyWithWhereWithoutPatientInput = {
    where: CareCircleScalarWhereInput
    data: XOR<CareCircleUpdateManyMutationInput, CareCircleUncheckedUpdateManyWithoutPatientInput>
  }

  export type CareCircleScalarWhereInput = {
    AND?: CareCircleScalarWhereInput | CareCircleScalarWhereInput[]
    OR?: CareCircleScalarWhereInput[]
    NOT?: CareCircleScalarWhereInput | CareCircleScalarWhereInput[]
    id?: UuidFilter<"CareCircle"> | string
    name?: StringFilter<"CareCircle"> | string
    patientId?: UuidFilter<"CareCircle"> | string
    ownerId?: UuidFilter<"CareCircle"> | string
    createdAt?: DateTimeFilter<"CareCircle"> | Date | string
    updatedAt?: DateTimeFilter<"CareCircle"> | Date | string
  }

  export type CareCircleUpsertWithWhereUniqueWithoutOwnerInput = {
    where: CareCircleWhereUniqueInput
    update: XOR<CareCircleUpdateWithoutOwnerInput, CareCircleUncheckedUpdateWithoutOwnerInput>
    create: XOR<CareCircleCreateWithoutOwnerInput, CareCircleUncheckedCreateWithoutOwnerInput>
  }

  export type CareCircleUpdateWithWhereUniqueWithoutOwnerInput = {
    where: CareCircleWhereUniqueInput
    data: XOR<CareCircleUpdateWithoutOwnerInput, CareCircleUncheckedUpdateWithoutOwnerInput>
  }

  export type CareCircleUpdateManyWithWhereWithoutOwnerInput = {
    where: CareCircleScalarWhereInput
    data: XOR<CareCircleUpdateManyMutationInput, CareCircleUncheckedUpdateManyWithoutOwnerInput>
  }

  export type CareCircleMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: CareCircleMemberWhereUniqueInput
    update: XOR<CareCircleMemberUpdateWithoutUserInput, CareCircleMemberUncheckedUpdateWithoutUserInput>
    create: XOR<CareCircleMemberCreateWithoutUserInput, CareCircleMemberUncheckedCreateWithoutUserInput>
  }

  export type CareCircleMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: CareCircleMemberWhereUniqueInput
    data: XOR<CareCircleMemberUpdateWithoutUserInput, CareCircleMemberUncheckedUpdateWithoutUserInput>
  }

  export type CareCircleMemberUpdateManyWithWhereWithoutUserInput = {
    where: CareCircleMemberScalarWhereInput
    data: XOR<CareCircleMemberUpdateManyMutationInput, CareCircleMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type CareCircleMemberScalarWhereInput = {
    AND?: CareCircleMemberScalarWhereInput | CareCircleMemberScalarWhereInput[]
    OR?: CareCircleMemberScalarWhereInput[]
    NOT?: CareCircleMemberScalarWhereInput | CareCircleMemberScalarWhereInput[]
    id?: UuidFilter<"CareCircleMember"> | string
    circleId?: UuidFilter<"CareCircleMember"> | string
    userId?: UuidFilter<"CareCircleMember"> | string
    roleId?: UuidFilter<"CareCircleMember"> | string
    status?: EnumMemberStatusFilter<"CareCircleMember"> | $Enums.MemberStatus
    joinedAt?: DateTimeFilter<"CareCircleMember"> | Date | string
    revokedAt?: DateTimeNullableFilter<"CareCircleMember"> | Date | string | null
  }

  export type InvitationUpsertWithWhereUniqueWithoutInvitedByInput = {
    where: InvitationWhereUniqueInput
    update: XOR<InvitationUpdateWithoutInvitedByInput, InvitationUncheckedUpdateWithoutInvitedByInput>
    create: XOR<InvitationCreateWithoutInvitedByInput, InvitationUncheckedCreateWithoutInvitedByInput>
  }

  export type InvitationUpdateWithWhereUniqueWithoutInvitedByInput = {
    where: InvitationWhereUniqueInput
    data: XOR<InvitationUpdateWithoutInvitedByInput, InvitationUncheckedUpdateWithoutInvitedByInput>
  }

  export type InvitationUpdateManyWithWhereWithoutInvitedByInput = {
    where: InvitationScalarWhereInput
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyWithoutInvitedByInput>
  }

  export type InvitationScalarWhereInput = {
    AND?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
    OR?: InvitationScalarWhereInput[]
    NOT?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
    id?: UuidFilter<"Invitation"> | string
    circleId?: UuidFilter<"Invitation"> | string
    invitedById?: UuidFilter<"Invitation"> | string
    roleId?: UuidFilter<"Invitation"> | string
    email?: StringNullableFilter<"Invitation"> | string | null
    phone?: StringNullableFilter<"Invitation"> | string | null
    tokenHash?: StringFilter<"Invitation"> | string
    status?: EnumInvitationStatusFilter<"Invitation"> | $Enums.InvitationStatus
    expiresAt?: DateTimeFilter<"Invitation"> | Date | string
    acceptedAt?: DateTimeNullableFilter<"Invitation"> | Date | string | null
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
  }

  export type ConsentUpsertWithWhereUniqueWithoutGrantedByInput = {
    where: ConsentWhereUniqueInput
    update: XOR<ConsentUpdateWithoutGrantedByInput, ConsentUncheckedUpdateWithoutGrantedByInput>
    create: XOR<ConsentCreateWithoutGrantedByInput, ConsentUncheckedCreateWithoutGrantedByInput>
  }

  export type ConsentUpdateWithWhereUniqueWithoutGrantedByInput = {
    where: ConsentWhereUniqueInput
    data: XOR<ConsentUpdateWithoutGrantedByInput, ConsentUncheckedUpdateWithoutGrantedByInput>
  }

  export type ConsentUpdateManyWithWhereWithoutGrantedByInput = {
    where: ConsentScalarWhereInput
    data: XOR<ConsentUpdateManyMutationInput, ConsentUncheckedUpdateManyWithoutGrantedByInput>
  }

  export type ConsentScalarWhereInput = {
    AND?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
    OR?: ConsentScalarWhereInput[]
    NOT?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
    id?: UuidFilter<"Consent"> | string
    circleId?: UuidFilter<"Consent"> | string
    memberId?: UuidFilter<"Consent"> | string
    grantedById?: UuidFilter<"Consent"> | string
    status?: EnumConsentStatusFilter<"Consent"> | $Enums.ConsentStatus
    scope?: JsonFilter<"Consent">
    grantedAt?: DateTimeFilter<"Consent"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Consent"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"Consent"> | Date | string | null
  }

  export type AuditLogUpsertWithWhereUniqueWithoutActorInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutActorInput, AuditLogUncheckedUpdateWithoutActorInput>
    create: XOR<AuditLogCreateWithoutActorInput, AuditLogUncheckedCreateWithoutActorInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutActorInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutActorInput, AuditLogUncheckedUpdateWithoutActorInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutActorInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutActorInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: UuidFilter<"AuditLog"> | string
    actorId?: UuidFilter<"AuditLog"> | string
    circleId?: UuidNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    resourceType?: StringFilter<"AuditLog"> | string
    resourceId?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type UserCreateWithoutPatientCirclesInput = {
    id?: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedCircles?: CareCircleCreateNestedManyWithoutOwnerInput
    memberships?: CareCircleMemberCreateNestedManyWithoutUserInput
    sentInvitations?: InvitationCreateNestedManyWithoutInvitedByInput
    consentsGranted?: ConsentCreateNestedManyWithoutGrantedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutPatientCirclesInput = {
    id?: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedCircles?: CareCircleUncheckedCreateNestedManyWithoutOwnerInput
    memberships?: CareCircleMemberUncheckedCreateNestedManyWithoutUserInput
    sentInvitations?: InvitationUncheckedCreateNestedManyWithoutInvitedByInput
    consentsGranted?: ConsentUncheckedCreateNestedManyWithoutGrantedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutPatientCirclesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPatientCirclesInput, UserUncheckedCreateWithoutPatientCirclesInput>
  }

  export type UserCreateWithoutOwnedCirclesInput = {
    id?: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patientCircles?: CareCircleCreateNestedManyWithoutPatientInput
    memberships?: CareCircleMemberCreateNestedManyWithoutUserInput
    sentInvitations?: InvitationCreateNestedManyWithoutInvitedByInput
    consentsGranted?: ConsentCreateNestedManyWithoutGrantedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutOwnedCirclesInput = {
    id?: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patientCircles?: CareCircleUncheckedCreateNestedManyWithoutPatientInput
    memberships?: CareCircleMemberUncheckedCreateNestedManyWithoutUserInput
    sentInvitations?: InvitationUncheckedCreateNestedManyWithoutInvitedByInput
    consentsGranted?: ConsentUncheckedCreateNestedManyWithoutGrantedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutOwnedCirclesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedCirclesInput, UserUncheckedCreateWithoutOwnedCirclesInput>
  }

  export type CareCircleMemberCreateWithoutCircleInput = {
    id?: string
    status?: $Enums.MemberStatus
    joinedAt?: Date | string
    revokedAt?: Date | string | null
    user: UserCreateNestedOneWithoutMembershipsInput
    role: RoleCreateNestedOneWithoutMembershipsInput
    consents?: ConsentCreateNestedManyWithoutMemberInput
  }

  export type CareCircleMemberUncheckedCreateWithoutCircleInput = {
    id?: string
    userId: string
    roleId: string
    status?: $Enums.MemberStatus
    joinedAt?: Date | string
    revokedAt?: Date | string | null
    consents?: ConsentUncheckedCreateNestedManyWithoutMemberInput
  }

  export type CareCircleMemberCreateOrConnectWithoutCircleInput = {
    where: CareCircleMemberWhereUniqueInput
    create: XOR<CareCircleMemberCreateWithoutCircleInput, CareCircleMemberUncheckedCreateWithoutCircleInput>
  }

  export type CareCircleMemberCreateManyCircleInputEnvelope = {
    data: CareCircleMemberCreateManyCircleInput | CareCircleMemberCreateManyCircleInput[]
    skipDuplicates?: boolean
  }

  export type InvitationCreateWithoutCircleInput = {
    id?: string
    email?: string | null
    phone?: string | null
    tokenHash: string
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
    invitedBy: UserCreateNestedOneWithoutSentInvitationsInput
    role: RoleCreateNestedOneWithoutInvitationsInput
  }

  export type InvitationUncheckedCreateWithoutCircleInput = {
    id?: string
    invitedById: string
    roleId: string
    email?: string | null
    phone?: string | null
    tokenHash: string
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type InvitationCreateOrConnectWithoutCircleInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutCircleInput, InvitationUncheckedCreateWithoutCircleInput>
  }

  export type InvitationCreateManyCircleInputEnvelope = {
    data: InvitationCreateManyCircleInput | InvitationCreateManyCircleInput[]
    skipDuplicates?: boolean
  }

  export type ConsentCreateWithoutCircleInput = {
    id?: string
    status?: $Enums.ConsentStatus
    scope: JsonNullValueInput | InputJsonValue
    grantedAt?: Date | string
    revokedAt?: Date | string | null
    expiresAt?: Date | string | null
    member: CareCircleMemberCreateNestedOneWithoutConsentsInput
    grantedBy: UserCreateNestedOneWithoutConsentsGrantedInput
  }

  export type ConsentUncheckedCreateWithoutCircleInput = {
    id?: string
    memberId: string
    grantedById: string
    status?: $Enums.ConsentStatus
    scope: JsonNullValueInput | InputJsonValue
    grantedAt?: Date | string
    revokedAt?: Date | string | null
    expiresAt?: Date | string | null
  }

  export type ConsentCreateOrConnectWithoutCircleInput = {
    where: ConsentWhereUniqueInput
    create: XOR<ConsentCreateWithoutCircleInput, ConsentUncheckedCreateWithoutCircleInput>
  }

  export type ConsentCreateManyCircleInputEnvelope = {
    data: ConsentCreateManyCircleInput | ConsentCreateManyCircleInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutCircleInput = {
    id?: string
    action: string
    resourceType: string
    resourceId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    actor: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutCircleInput = {
    id?: string
    actorId: string
    action: string
    resourceType: string
    resourceId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutCircleInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutCircleInput, AuditLogUncheckedCreateWithoutCircleInput>
  }

  export type AuditLogCreateManyCircleInputEnvelope = {
    data: AuditLogCreateManyCircleInput | AuditLogCreateManyCircleInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPatientCirclesInput = {
    update: XOR<UserUpdateWithoutPatientCirclesInput, UserUncheckedUpdateWithoutPatientCirclesInput>
    create: XOR<UserCreateWithoutPatientCirclesInput, UserUncheckedCreateWithoutPatientCirclesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPatientCirclesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPatientCirclesInput, UserUncheckedUpdateWithoutPatientCirclesInput>
  }

  export type UserUpdateWithoutPatientCirclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedCircles?: CareCircleUpdateManyWithoutOwnerNestedInput
    memberships?: CareCircleMemberUpdateManyWithoutUserNestedInput
    sentInvitations?: InvitationUpdateManyWithoutInvitedByNestedInput
    consentsGranted?: ConsentUpdateManyWithoutGrantedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutPatientCirclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedCircles?: CareCircleUncheckedUpdateManyWithoutOwnerNestedInput
    memberships?: CareCircleMemberUncheckedUpdateManyWithoutUserNestedInput
    sentInvitations?: InvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    consentsGranted?: ConsentUncheckedUpdateManyWithoutGrantedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
  }

  export type UserUpsertWithoutOwnedCirclesInput = {
    update: XOR<UserUpdateWithoutOwnedCirclesInput, UserUncheckedUpdateWithoutOwnedCirclesInput>
    create: XOR<UserCreateWithoutOwnedCirclesInput, UserUncheckedCreateWithoutOwnedCirclesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwnedCirclesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwnedCirclesInput, UserUncheckedUpdateWithoutOwnedCirclesInput>
  }

  export type UserUpdateWithoutOwnedCirclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientCircles?: CareCircleUpdateManyWithoutPatientNestedInput
    memberships?: CareCircleMemberUpdateManyWithoutUserNestedInput
    sentInvitations?: InvitationUpdateManyWithoutInvitedByNestedInput
    consentsGranted?: ConsentUpdateManyWithoutGrantedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedCirclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientCircles?: CareCircleUncheckedUpdateManyWithoutPatientNestedInput
    memberships?: CareCircleMemberUncheckedUpdateManyWithoutUserNestedInput
    sentInvitations?: InvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    consentsGranted?: ConsentUncheckedUpdateManyWithoutGrantedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
  }

  export type CareCircleMemberUpsertWithWhereUniqueWithoutCircleInput = {
    where: CareCircleMemberWhereUniqueInput
    update: XOR<CareCircleMemberUpdateWithoutCircleInput, CareCircleMemberUncheckedUpdateWithoutCircleInput>
    create: XOR<CareCircleMemberCreateWithoutCircleInput, CareCircleMemberUncheckedCreateWithoutCircleInput>
  }

  export type CareCircleMemberUpdateWithWhereUniqueWithoutCircleInput = {
    where: CareCircleMemberWhereUniqueInput
    data: XOR<CareCircleMemberUpdateWithoutCircleInput, CareCircleMemberUncheckedUpdateWithoutCircleInput>
  }

  export type CareCircleMemberUpdateManyWithWhereWithoutCircleInput = {
    where: CareCircleMemberScalarWhereInput
    data: XOR<CareCircleMemberUpdateManyMutationInput, CareCircleMemberUncheckedUpdateManyWithoutCircleInput>
  }

  export type InvitationUpsertWithWhereUniqueWithoutCircleInput = {
    where: InvitationWhereUniqueInput
    update: XOR<InvitationUpdateWithoutCircleInput, InvitationUncheckedUpdateWithoutCircleInput>
    create: XOR<InvitationCreateWithoutCircleInput, InvitationUncheckedCreateWithoutCircleInput>
  }

  export type InvitationUpdateWithWhereUniqueWithoutCircleInput = {
    where: InvitationWhereUniqueInput
    data: XOR<InvitationUpdateWithoutCircleInput, InvitationUncheckedUpdateWithoutCircleInput>
  }

  export type InvitationUpdateManyWithWhereWithoutCircleInput = {
    where: InvitationScalarWhereInput
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyWithoutCircleInput>
  }

  export type ConsentUpsertWithWhereUniqueWithoutCircleInput = {
    where: ConsentWhereUniqueInput
    update: XOR<ConsentUpdateWithoutCircleInput, ConsentUncheckedUpdateWithoutCircleInput>
    create: XOR<ConsentCreateWithoutCircleInput, ConsentUncheckedCreateWithoutCircleInput>
  }

  export type ConsentUpdateWithWhereUniqueWithoutCircleInput = {
    where: ConsentWhereUniqueInput
    data: XOR<ConsentUpdateWithoutCircleInput, ConsentUncheckedUpdateWithoutCircleInput>
  }

  export type ConsentUpdateManyWithWhereWithoutCircleInput = {
    where: ConsentScalarWhereInput
    data: XOR<ConsentUpdateManyMutationInput, ConsentUncheckedUpdateManyWithoutCircleInput>
  }

  export type AuditLogUpsertWithWhereUniqueWithoutCircleInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutCircleInput, AuditLogUncheckedUpdateWithoutCircleInput>
    create: XOR<AuditLogCreateWithoutCircleInput, AuditLogUncheckedCreateWithoutCircleInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutCircleInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutCircleInput, AuditLogUncheckedUpdateWithoutCircleInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutCircleInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutCircleInput>
  }

  export type CareCircleCreateWithoutMembershipsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: UserCreateNestedOneWithoutPatientCirclesInput
    owner: UserCreateNestedOneWithoutOwnedCirclesInput
    invitations?: InvitationCreateNestedManyWithoutCircleInput
    consents?: ConsentCreateNestedManyWithoutCircleInput
    auditLogs?: AuditLogCreateNestedManyWithoutCircleInput
  }

  export type CareCircleUncheckedCreateWithoutMembershipsInput = {
    id?: string
    name: string
    patientId: string
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    invitations?: InvitationUncheckedCreateNestedManyWithoutCircleInput
    consents?: ConsentUncheckedCreateNestedManyWithoutCircleInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCircleInput
  }

  export type CareCircleCreateOrConnectWithoutMembershipsInput = {
    where: CareCircleWhereUniqueInput
    create: XOR<CareCircleCreateWithoutMembershipsInput, CareCircleUncheckedCreateWithoutMembershipsInput>
  }

  export type UserCreateWithoutMembershipsInput = {
    id?: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patientCircles?: CareCircleCreateNestedManyWithoutPatientInput
    ownedCircles?: CareCircleCreateNestedManyWithoutOwnerInput
    sentInvitations?: InvitationCreateNestedManyWithoutInvitedByInput
    consentsGranted?: ConsentCreateNestedManyWithoutGrantedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutMembershipsInput = {
    id?: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patientCircles?: CareCircleUncheckedCreateNestedManyWithoutPatientInput
    ownedCircles?: CareCircleUncheckedCreateNestedManyWithoutOwnerInput
    sentInvitations?: InvitationUncheckedCreateNestedManyWithoutInvitedByInput
    consentsGranted?: ConsentUncheckedCreateNestedManyWithoutGrantedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
  }

  export type RoleCreateWithoutMembershipsInput = {
    id?: string
    name: $Enums.RoleName
    description?: string | null
    createdAt?: Date | string
    rolePermissions?: RolePermissionCreateNestedManyWithoutRoleInput
    invitations?: InvitationCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutMembershipsInput = {
    id?: string
    name: $Enums.RoleName
    description?: string | null
    createdAt?: Date | string
    rolePermissions?: RolePermissionUncheckedCreateNestedManyWithoutRoleInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutMembershipsInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutMembershipsInput, RoleUncheckedCreateWithoutMembershipsInput>
  }

  export type ConsentCreateWithoutMemberInput = {
    id?: string
    status?: $Enums.ConsentStatus
    scope: JsonNullValueInput | InputJsonValue
    grantedAt?: Date | string
    revokedAt?: Date | string | null
    expiresAt?: Date | string | null
    circle: CareCircleCreateNestedOneWithoutConsentsInput
    grantedBy: UserCreateNestedOneWithoutConsentsGrantedInput
  }

  export type ConsentUncheckedCreateWithoutMemberInput = {
    id?: string
    circleId: string
    grantedById: string
    status?: $Enums.ConsentStatus
    scope: JsonNullValueInput | InputJsonValue
    grantedAt?: Date | string
    revokedAt?: Date | string | null
    expiresAt?: Date | string | null
  }

  export type ConsentCreateOrConnectWithoutMemberInput = {
    where: ConsentWhereUniqueInput
    create: XOR<ConsentCreateWithoutMemberInput, ConsentUncheckedCreateWithoutMemberInput>
  }

  export type ConsentCreateManyMemberInputEnvelope = {
    data: ConsentCreateManyMemberInput | ConsentCreateManyMemberInput[]
    skipDuplicates?: boolean
  }

  export type CareCircleUpsertWithoutMembershipsInput = {
    update: XOR<CareCircleUpdateWithoutMembershipsInput, CareCircleUncheckedUpdateWithoutMembershipsInput>
    create: XOR<CareCircleCreateWithoutMembershipsInput, CareCircleUncheckedCreateWithoutMembershipsInput>
    where?: CareCircleWhereInput
  }

  export type CareCircleUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: CareCircleWhereInput
    data: XOR<CareCircleUpdateWithoutMembershipsInput, CareCircleUncheckedUpdateWithoutMembershipsInput>
  }

  export type CareCircleUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: UserUpdateOneRequiredWithoutPatientCirclesNestedInput
    owner?: UserUpdateOneRequiredWithoutOwnedCirclesNestedInput
    invitations?: InvitationUpdateManyWithoutCircleNestedInput
    consents?: ConsentUpdateManyWithoutCircleNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCircleNestedInput
  }

  export type CareCircleUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitations?: InvitationUncheckedUpdateManyWithoutCircleNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutCircleNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCircleNestedInput
  }

  export type UserUpsertWithoutMembershipsInput = {
    update: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientCircles?: CareCircleUpdateManyWithoutPatientNestedInput
    ownedCircles?: CareCircleUpdateManyWithoutOwnerNestedInput
    sentInvitations?: InvitationUpdateManyWithoutInvitedByNestedInput
    consentsGranted?: ConsentUpdateManyWithoutGrantedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientCircles?: CareCircleUncheckedUpdateManyWithoutPatientNestedInput
    ownedCircles?: CareCircleUncheckedUpdateManyWithoutOwnerNestedInput
    sentInvitations?: InvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    consentsGranted?: ConsentUncheckedUpdateManyWithoutGrantedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
  }

  export type RoleUpsertWithoutMembershipsInput = {
    update: XOR<RoleUpdateWithoutMembershipsInput, RoleUncheckedUpdateWithoutMembershipsInput>
    create: XOR<RoleCreateWithoutMembershipsInput, RoleUncheckedCreateWithoutMembershipsInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutMembershipsInput, RoleUncheckedUpdateWithoutMembershipsInput>
  }

  export type RoleUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumRoleNameFieldUpdateOperationsInput | $Enums.RoleName
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissions?: RolePermissionUpdateManyWithoutRoleNestedInput
    invitations?: InvitationUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumRoleNameFieldUpdateOperationsInput | $Enums.RoleName
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissions?: RolePermissionUncheckedUpdateManyWithoutRoleNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type ConsentUpsertWithWhereUniqueWithoutMemberInput = {
    where: ConsentWhereUniqueInput
    update: XOR<ConsentUpdateWithoutMemberInput, ConsentUncheckedUpdateWithoutMemberInput>
    create: XOR<ConsentCreateWithoutMemberInput, ConsentUncheckedCreateWithoutMemberInput>
  }

  export type ConsentUpdateWithWhereUniqueWithoutMemberInput = {
    where: ConsentWhereUniqueInput
    data: XOR<ConsentUpdateWithoutMemberInput, ConsentUncheckedUpdateWithoutMemberInput>
  }

  export type ConsentUpdateManyWithWhereWithoutMemberInput = {
    where: ConsentScalarWhereInput
    data: XOR<ConsentUpdateManyMutationInput, ConsentUncheckedUpdateManyWithoutMemberInput>
  }

  export type CareCircleMemberCreateWithoutRoleInput = {
    id?: string
    status?: $Enums.MemberStatus
    joinedAt?: Date | string
    revokedAt?: Date | string | null
    circle: CareCircleCreateNestedOneWithoutMembershipsInput
    user: UserCreateNestedOneWithoutMembershipsInput
    consents?: ConsentCreateNestedManyWithoutMemberInput
  }

  export type CareCircleMemberUncheckedCreateWithoutRoleInput = {
    id?: string
    circleId: string
    userId: string
    status?: $Enums.MemberStatus
    joinedAt?: Date | string
    revokedAt?: Date | string | null
    consents?: ConsentUncheckedCreateNestedManyWithoutMemberInput
  }

  export type CareCircleMemberCreateOrConnectWithoutRoleInput = {
    where: CareCircleMemberWhereUniqueInput
    create: XOR<CareCircleMemberCreateWithoutRoleInput, CareCircleMemberUncheckedCreateWithoutRoleInput>
  }

  export type CareCircleMemberCreateManyRoleInputEnvelope = {
    data: CareCircleMemberCreateManyRoleInput | CareCircleMemberCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type RolePermissionCreateWithoutRoleInput = {
    permission: PermissionCreateNestedOneWithoutRolePermissionsInput
  }

  export type RolePermissionUncheckedCreateWithoutRoleInput = {
    permissionId: string
  }

  export type RolePermissionCreateOrConnectWithoutRoleInput = {
    where: RolePermissionWhereUniqueInput
    create: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput>
  }

  export type RolePermissionCreateManyRoleInputEnvelope = {
    data: RolePermissionCreateManyRoleInput | RolePermissionCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type InvitationCreateWithoutRoleInput = {
    id?: string
    email?: string | null
    phone?: string | null
    tokenHash: string
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
    circle: CareCircleCreateNestedOneWithoutInvitationsInput
    invitedBy: UserCreateNestedOneWithoutSentInvitationsInput
  }

  export type InvitationUncheckedCreateWithoutRoleInput = {
    id?: string
    circleId: string
    invitedById: string
    email?: string | null
    phone?: string | null
    tokenHash: string
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type InvitationCreateOrConnectWithoutRoleInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutRoleInput, InvitationUncheckedCreateWithoutRoleInput>
  }

  export type InvitationCreateManyRoleInputEnvelope = {
    data: InvitationCreateManyRoleInput | InvitationCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type CareCircleMemberUpsertWithWhereUniqueWithoutRoleInput = {
    where: CareCircleMemberWhereUniqueInput
    update: XOR<CareCircleMemberUpdateWithoutRoleInput, CareCircleMemberUncheckedUpdateWithoutRoleInput>
    create: XOR<CareCircleMemberCreateWithoutRoleInput, CareCircleMemberUncheckedCreateWithoutRoleInput>
  }

  export type CareCircleMemberUpdateWithWhereUniqueWithoutRoleInput = {
    where: CareCircleMemberWhereUniqueInput
    data: XOR<CareCircleMemberUpdateWithoutRoleInput, CareCircleMemberUncheckedUpdateWithoutRoleInput>
  }

  export type CareCircleMemberUpdateManyWithWhereWithoutRoleInput = {
    where: CareCircleMemberScalarWhereInput
    data: XOR<CareCircleMemberUpdateManyMutationInput, CareCircleMemberUncheckedUpdateManyWithoutRoleInput>
  }

  export type RolePermissionUpsertWithWhereUniqueWithoutRoleInput = {
    where: RolePermissionWhereUniqueInput
    update: XOR<RolePermissionUpdateWithoutRoleInput, RolePermissionUncheckedUpdateWithoutRoleInput>
    create: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput>
  }

  export type RolePermissionUpdateWithWhereUniqueWithoutRoleInput = {
    where: RolePermissionWhereUniqueInput
    data: XOR<RolePermissionUpdateWithoutRoleInput, RolePermissionUncheckedUpdateWithoutRoleInput>
  }

  export type RolePermissionUpdateManyWithWhereWithoutRoleInput = {
    where: RolePermissionScalarWhereInput
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyWithoutRoleInput>
  }

  export type RolePermissionScalarWhereInput = {
    AND?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
    OR?: RolePermissionScalarWhereInput[]
    NOT?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
    roleId?: UuidFilter<"RolePermission"> | string
    permissionId?: UuidFilter<"RolePermission"> | string
  }

  export type InvitationUpsertWithWhereUniqueWithoutRoleInput = {
    where: InvitationWhereUniqueInput
    update: XOR<InvitationUpdateWithoutRoleInput, InvitationUncheckedUpdateWithoutRoleInput>
    create: XOR<InvitationCreateWithoutRoleInput, InvitationUncheckedCreateWithoutRoleInput>
  }

  export type InvitationUpdateWithWhereUniqueWithoutRoleInput = {
    where: InvitationWhereUniqueInput
    data: XOR<InvitationUpdateWithoutRoleInput, InvitationUncheckedUpdateWithoutRoleInput>
  }

  export type InvitationUpdateManyWithWhereWithoutRoleInput = {
    where: InvitationScalarWhereInput
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyWithoutRoleInput>
  }

  export type RolePermissionCreateWithoutPermissionInput = {
    role: RoleCreateNestedOneWithoutRolePermissionsInput
  }

  export type RolePermissionUncheckedCreateWithoutPermissionInput = {
    roleId: string
  }

  export type RolePermissionCreateOrConnectWithoutPermissionInput = {
    where: RolePermissionWhereUniqueInput
    create: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput>
  }

  export type RolePermissionCreateManyPermissionInputEnvelope = {
    data: RolePermissionCreateManyPermissionInput | RolePermissionCreateManyPermissionInput[]
    skipDuplicates?: boolean
  }

  export type RolePermissionUpsertWithWhereUniqueWithoutPermissionInput = {
    where: RolePermissionWhereUniqueInput
    update: XOR<RolePermissionUpdateWithoutPermissionInput, RolePermissionUncheckedUpdateWithoutPermissionInput>
    create: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput>
  }

  export type RolePermissionUpdateWithWhereUniqueWithoutPermissionInput = {
    where: RolePermissionWhereUniqueInput
    data: XOR<RolePermissionUpdateWithoutPermissionInput, RolePermissionUncheckedUpdateWithoutPermissionInput>
  }

  export type RolePermissionUpdateManyWithWhereWithoutPermissionInput = {
    where: RolePermissionScalarWhereInput
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyWithoutPermissionInput>
  }

  export type RoleCreateWithoutRolePermissionsInput = {
    id?: string
    name: $Enums.RoleName
    description?: string | null
    createdAt?: Date | string
    memberships?: CareCircleMemberCreateNestedManyWithoutRoleInput
    invitations?: InvitationCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutRolePermissionsInput = {
    id?: string
    name: $Enums.RoleName
    description?: string | null
    createdAt?: Date | string
    memberships?: CareCircleMemberUncheckedCreateNestedManyWithoutRoleInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutRolePermissionsInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutRolePermissionsInput, RoleUncheckedCreateWithoutRolePermissionsInput>
  }

  export type PermissionCreateWithoutRolePermissionsInput = {
    id?: string
    key: string
    description?: string | null
    createdAt?: Date | string
  }

  export type PermissionUncheckedCreateWithoutRolePermissionsInput = {
    id?: string
    key: string
    description?: string | null
    createdAt?: Date | string
  }

  export type PermissionCreateOrConnectWithoutRolePermissionsInput = {
    where: PermissionWhereUniqueInput
    create: XOR<PermissionCreateWithoutRolePermissionsInput, PermissionUncheckedCreateWithoutRolePermissionsInput>
  }

  export type RoleUpsertWithoutRolePermissionsInput = {
    update: XOR<RoleUpdateWithoutRolePermissionsInput, RoleUncheckedUpdateWithoutRolePermissionsInput>
    create: XOR<RoleCreateWithoutRolePermissionsInput, RoleUncheckedCreateWithoutRolePermissionsInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutRolePermissionsInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutRolePermissionsInput, RoleUncheckedUpdateWithoutRolePermissionsInput>
  }

  export type RoleUpdateWithoutRolePermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumRoleNameFieldUpdateOperationsInput | $Enums.RoleName
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: CareCircleMemberUpdateManyWithoutRoleNestedInput
    invitations?: InvitationUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutRolePermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumRoleNameFieldUpdateOperationsInput | $Enums.RoleName
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: CareCircleMemberUncheckedUpdateManyWithoutRoleNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type PermissionUpsertWithoutRolePermissionsInput = {
    update: XOR<PermissionUpdateWithoutRolePermissionsInput, PermissionUncheckedUpdateWithoutRolePermissionsInput>
    create: XOR<PermissionCreateWithoutRolePermissionsInput, PermissionUncheckedCreateWithoutRolePermissionsInput>
    where?: PermissionWhereInput
  }

  export type PermissionUpdateToOneWithWhereWithoutRolePermissionsInput = {
    where?: PermissionWhereInput
    data: XOR<PermissionUpdateWithoutRolePermissionsInput, PermissionUncheckedUpdateWithoutRolePermissionsInput>
  }

  export type PermissionUpdateWithoutRolePermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUncheckedUpdateWithoutRolePermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareCircleCreateWithoutInvitationsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: UserCreateNestedOneWithoutPatientCirclesInput
    owner: UserCreateNestedOneWithoutOwnedCirclesInput
    memberships?: CareCircleMemberCreateNestedManyWithoutCircleInput
    consents?: ConsentCreateNestedManyWithoutCircleInput
    auditLogs?: AuditLogCreateNestedManyWithoutCircleInput
  }

  export type CareCircleUncheckedCreateWithoutInvitationsInput = {
    id?: string
    name: string
    patientId: string
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: CareCircleMemberUncheckedCreateNestedManyWithoutCircleInput
    consents?: ConsentUncheckedCreateNestedManyWithoutCircleInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCircleInput
  }

  export type CareCircleCreateOrConnectWithoutInvitationsInput = {
    where: CareCircleWhereUniqueInput
    create: XOR<CareCircleCreateWithoutInvitationsInput, CareCircleUncheckedCreateWithoutInvitationsInput>
  }

  export type UserCreateWithoutSentInvitationsInput = {
    id?: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patientCircles?: CareCircleCreateNestedManyWithoutPatientInput
    ownedCircles?: CareCircleCreateNestedManyWithoutOwnerInput
    memberships?: CareCircleMemberCreateNestedManyWithoutUserInput
    consentsGranted?: ConsentCreateNestedManyWithoutGrantedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutSentInvitationsInput = {
    id?: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patientCircles?: CareCircleUncheckedCreateNestedManyWithoutPatientInput
    ownedCircles?: CareCircleUncheckedCreateNestedManyWithoutOwnerInput
    memberships?: CareCircleMemberUncheckedCreateNestedManyWithoutUserInput
    consentsGranted?: ConsentUncheckedCreateNestedManyWithoutGrantedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutSentInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
  }

  export type RoleCreateWithoutInvitationsInput = {
    id?: string
    name: $Enums.RoleName
    description?: string | null
    createdAt?: Date | string
    memberships?: CareCircleMemberCreateNestedManyWithoutRoleInput
    rolePermissions?: RolePermissionCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutInvitationsInput = {
    id?: string
    name: $Enums.RoleName
    description?: string | null
    createdAt?: Date | string
    memberships?: CareCircleMemberUncheckedCreateNestedManyWithoutRoleInput
    rolePermissions?: RolePermissionUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutInvitationsInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutInvitationsInput, RoleUncheckedCreateWithoutInvitationsInput>
  }

  export type CareCircleUpsertWithoutInvitationsInput = {
    update: XOR<CareCircleUpdateWithoutInvitationsInput, CareCircleUncheckedUpdateWithoutInvitationsInput>
    create: XOR<CareCircleCreateWithoutInvitationsInput, CareCircleUncheckedCreateWithoutInvitationsInput>
    where?: CareCircleWhereInput
  }

  export type CareCircleUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: CareCircleWhereInput
    data: XOR<CareCircleUpdateWithoutInvitationsInput, CareCircleUncheckedUpdateWithoutInvitationsInput>
  }

  export type CareCircleUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: UserUpdateOneRequiredWithoutPatientCirclesNestedInput
    owner?: UserUpdateOneRequiredWithoutOwnedCirclesNestedInput
    memberships?: CareCircleMemberUpdateManyWithoutCircleNestedInput
    consents?: ConsentUpdateManyWithoutCircleNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCircleNestedInput
  }

  export type CareCircleUncheckedUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: CareCircleMemberUncheckedUpdateManyWithoutCircleNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutCircleNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCircleNestedInput
  }

  export type UserUpsertWithoutSentInvitationsInput = {
    update: XOR<UserUpdateWithoutSentInvitationsInput, UserUncheckedUpdateWithoutSentInvitationsInput>
    create: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentInvitationsInput, UserUncheckedUpdateWithoutSentInvitationsInput>
  }

  export type UserUpdateWithoutSentInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientCircles?: CareCircleUpdateManyWithoutPatientNestedInput
    ownedCircles?: CareCircleUpdateManyWithoutOwnerNestedInput
    memberships?: CareCircleMemberUpdateManyWithoutUserNestedInput
    consentsGranted?: ConsentUpdateManyWithoutGrantedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutSentInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientCircles?: CareCircleUncheckedUpdateManyWithoutPatientNestedInput
    ownedCircles?: CareCircleUncheckedUpdateManyWithoutOwnerNestedInput
    memberships?: CareCircleMemberUncheckedUpdateManyWithoutUserNestedInput
    consentsGranted?: ConsentUncheckedUpdateManyWithoutGrantedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
  }

  export type RoleUpsertWithoutInvitationsInput = {
    update: XOR<RoleUpdateWithoutInvitationsInput, RoleUncheckedUpdateWithoutInvitationsInput>
    create: XOR<RoleCreateWithoutInvitationsInput, RoleUncheckedCreateWithoutInvitationsInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutInvitationsInput, RoleUncheckedUpdateWithoutInvitationsInput>
  }

  export type RoleUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumRoleNameFieldUpdateOperationsInput | $Enums.RoleName
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: CareCircleMemberUpdateManyWithoutRoleNestedInput
    rolePermissions?: RolePermissionUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumRoleNameFieldUpdateOperationsInput | $Enums.RoleName
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: CareCircleMemberUncheckedUpdateManyWithoutRoleNestedInput
    rolePermissions?: RolePermissionUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type CareCircleCreateWithoutConsentsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: UserCreateNestedOneWithoutPatientCirclesInput
    owner: UserCreateNestedOneWithoutOwnedCirclesInput
    memberships?: CareCircleMemberCreateNestedManyWithoutCircleInput
    invitations?: InvitationCreateNestedManyWithoutCircleInput
    auditLogs?: AuditLogCreateNestedManyWithoutCircleInput
  }

  export type CareCircleUncheckedCreateWithoutConsentsInput = {
    id?: string
    name: string
    patientId: string
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: CareCircleMemberUncheckedCreateNestedManyWithoutCircleInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCircleInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCircleInput
  }

  export type CareCircleCreateOrConnectWithoutConsentsInput = {
    where: CareCircleWhereUniqueInput
    create: XOR<CareCircleCreateWithoutConsentsInput, CareCircleUncheckedCreateWithoutConsentsInput>
  }

  export type CareCircleMemberCreateWithoutConsentsInput = {
    id?: string
    status?: $Enums.MemberStatus
    joinedAt?: Date | string
    revokedAt?: Date | string | null
    circle: CareCircleCreateNestedOneWithoutMembershipsInput
    user: UserCreateNestedOneWithoutMembershipsInput
    role: RoleCreateNestedOneWithoutMembershipsInput
  }

  export type CareCircleMemberUncheckedCreateWithoutConsentsInput = {
    id?: string
    circleId: string
    userId: string
    roleId: string
    status?: $Enums.MemberStatus
    joinedAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type CareCircleMemberCreateOrConnectWithoutConsentsInput = {
    where: CareCircleMemberWhereUniqueInput
    create: XOR<CareCircleMemberCreateWithoutConsentsInput, CareCircleMemberUncheckedCreateWithoutConsentsInput>
  }

  export type UserCreateWithoutConsentsGrantedInput = {
    id?: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patientCircles?: CareCircleCreateNestedManyWithoutPatientInput
    ownedCircles?: CareCircleCreateNestedManyWithoutOwnerInput
    memberships?: CareCircleMemberCreateNestedManyWithoutUserInput
    sentInvitations?: InvitationCreateNestedManyWithoutInvitedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutConsentsGrantedInput = {
    id?: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patientCircles?: CareCircleUncheckedCreateNestedManyWithoutPatientInput
    ownedCircles?: CareCircleUncheckedCreateNestedManyWithoutOwnerInput
    memberships?: CareCircleMemberUncheckedCreateNestedManyWithoutUserInput
    sentInvitations?: InvitationUncheckedCreateNestedManyWithoutInvitedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutConsentsGrantedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConsentsGrantedInput, UserUncheckedCreateWithoutConsentsGrantedInput>
  }

  export type CareCircleUpsertWithoutConsentsInput = {
    update: XOR<CareCircleUpdateWithoutConsentsInput, CareCircleUncheckedUpdateWithoutConsentsInput>
    create: XOR<CareCircleCreateWithoutConsentsInput, CareCircleUncheckedCreateWithoutConsentsInput>
    where?: CareCircleWhereInput
  }

  export type CareCircleUpdateToOneWithWhereWithoutConsentsInput = {
    where?: CareCircleWhereInput
    data: XOR<CareCircleUpdateWithoutConsentsInput, CareCircleUncheckedUpdateWithoutConsentsInput>
  }

  export type CareCircleUpdateWithoutConsentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: UserUpdateOneRequiredWithoutPatientCirclesNestedInput
    owner?: UserUpdateOneRequiredWithoutOwnedCirclesNestedInput
    memberships?: CareCircleMemberUpdateManyWithoutCircleNestedInput
    invitations?: InvitationUpdateManyWithoutCircleNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCircleNestedInput
  }

  export type CareCircleUncheckedUpdateWithoutConsentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: CareCircleMemberUncheckedUpdateManyWithoutCircleNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutCircleNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCircleNestedInput
  }

  export type CareCircleMemberUpsertWithoutConsentsInput = {
    update: XOR<CareCircleMemberUpdateWithoutConsentsInput, CareCircleMemberUncheckedUpdateWithoutConsentsInput>
    create: XOR<CareCircleMemberCreateWithoutConsentsInput, CareCircleMemberUncheckedCreateWithoutConsentsInput>
    where?: CareCircleMemberWhereInput
  }

  export type CareCircleMemberUpdateToOneWithWhereWithoutConsentsInput = {
    where?: CareCircleMemberWhereInput
    data: XOR<CareCircleMemberUpdateWithoutConsentsInput, CareCircleMemberUncheckedUpdateWithoutConsentsInput>
  }

  export type CareCircleMemberUpdateWithoutConsentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    circle?: CareCircleUpdateOneRequiredWithoutMembershipsNestedInput
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
    role?: RoleUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type CareCircleMemberUncheckedUpdateWithoutConsentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpsertWithoutConsentsGrantedInput = {
    update: XOR<UserUpdateWithoutConsentsGrantedInput, UserUncheckedUpdateWithoutConsentsGrantedInput>
    create: XOR<UserCreateWithoutConsentsGrantedInput, UserUncheckedCreateWithoutConsentsGrantedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConsentsGrantedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConsentsGrantedInput, UserUncheckedUpdateWithoutConsentsGrantedInput>
  }

  export type UserUpdateWithoutConsentsGrantedInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientCircles?: CareCircleUpdateManyWithoutPatientNestedInput
    ownedCircles?: CareCircleUpdateManyWithoutOwnerNestedInput
    memberships?: CareCircleMemberUpdateManyWithoutUserNestedInput
    sentInvitations?: InvitationUpdateManyWithoutInvitedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutConsentsGrantedInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientCircles?: CareCircleUncheckedUpdateManyWithoutPatientNestedInput
    ownedCircles?: CareCircleUncheckedUpdateManyWithoutOwnerNestedInput
    memberships?: CareCircleMemberUncheckedUpdateManyWithoutUserNestedInput
    sentInvitations?: InvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutActorNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patientCircles?: CareCircleCreateNestedManyWithoutPatientInput
    ownedCircles?: CareCircleCreateNestedManyWithoutOwnerInput
    memberships?: CareCircleMemberCreateNestedManyWithoutUserInput
    sentInvitations?: InvitationCreateNestedManyWithoutInvitedByInput
    consentsGranted?: ConsentCreateNestedManyWithoutGrantedByInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    patientCircles?: CareCircleUncheckedCreateNestedManyWithoutPatientInput
    ownedCircles?: CareCircleUncheckedCreateNestedManyWithoutOwnerInput
    memberships?: CareCircleMemberUncheckedCreateNestedManyWithoutUserInput
    sentInvitations?: InvitationUncheckedCreateNestedManyWithoutInvitedByInput
    consentsGranted?: ConsentUncheckedCreateNestedManyWithoutGrantedByInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type CareCircleCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: UserCreateNestedOneWithoutPatientCirclesInput
    owner: UserCreateNestedOneWithoutOwnedCirclesInput
    memberships?: CareCircleMemberCreateNestedManyWithoutCircleInput
    invitations?: InvitationCreateNestedManyWithoutCircleInput
    consents?: ConsentCreateNestedManyWithoutCircleInput
  }

  export type CareCircleUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    patientId: string
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: CareCircleMemberUncheckedCreateNestedManyWithoutCircleInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutCircleInput
    consents?: ConsentUncheckedCreateNestedManyWithoutCircleInput
  }

  export type CareCircleCreateOrConnectWithoutAuditLogsInput = {
    where: CareCircleWhereUniqueInput
    create: XOR<CareCircleCreateWithoutAuditLogsInput, CareCircleUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientCircles?: CareCircleUpdateManyWithoutPatientNestedInput
    ownedCircles?: CareCircleUpdateManyWithoutOwnerNestedInput
    memberships?: CareCircleMemberUpdateManyWithoutUserNestedInput
    sentInvitations?: InvitationUpdateManyWithoutInvitedByNestedInput
    consentsGranted?: ConsentUpdateManyWithoutGrantedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientCircles?: CareCircleUncheckedUpdateManyWithoutPatientNestedInput
    ownedCircles?: CareCircleUncheckedUpdateManyWithoutOwnerNestedInput
    memberships?: CareCircleMemberUncheckedUpdateManyWithoutUserNestedInput
    sentInvitations?: InvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    consentsGranted?: ConsentUncheckedUpdateManyWithoutGrantedByNestedInput
  }

  export type CareCircleUpsertWithoutAuditLogsInput = {
    update: XOR<CareCircleUpdateWithoutAuditLogsInput, CareCircleUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<CareCircleCreateWithoutAuditLogsInput, CareCircleUncheckedCreateWithoutAuditLogsInput>
    where?: CareCircleWhereInput
  }

  export type CareCircleUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: CareCircleWhereInput
    data: XOR<CareCircleUpdateWithoutAuditLogsInput, CareCircleUncheckedUpdateWithoutAuditLogsInput>
  }

  export type CareCircleUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: UserUpdateOneRequiredWithoutPatientCirclesNestedInput
    owner?: UserUpdateOneRequiredWithoutOwnedCirclesNestedInput
    memberships?: CareCircleMemberUpdateManyWithoutCircleNestedInput
    invitations?: InvitationUpdateManyWithoutCircleNestedInput
    consents?: ConsentUpdateManyWithoutCircleNestedInput
  }

  export type CareCircleUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: CareCircleMemberUncheckedUpdateManyWithoutCircleNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutCircleNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutCircleNestedInput
  }

  export type CareCircleCreateManyPatientInput = {
    id?: string
    name: string
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CareCircleCreateManyOwnerInput = {
    id?: string
    name: string
    patientId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CareCircleMemberCreateManyUserInput = {
    id?: string
    circleId: string
    roleId: string
    status?: $Enums.MemberStatus
    joinedAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type InvitationCreateManyInvitedByInput = {
    id?: string
    circleId: string
    roleId: string
    email?: string | null
    phone?: string | null
    tokenHash: string
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ConsentCreateManyGrantedByInput = {
    id?: string
    circleId: string
    memberId: string
    status?: $Enums.ConsentStatus
    scope: JsonNullValueInput | InputJsonValue
    grantedAt?: Date | string
    revokedAt?: Date | string | null
    expiresAt?: Date | string | null
  }

  export type AuditLogCreateManyActorInput = {
    id?: string
    circleId?: string | null
    action: string
    resourceType: string
    resourceId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type CareCircleUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedCirclesNestedInput
    memberships?: CareCircleMemberUpdateManyWithoutCircleNestedInput
    invitations?: InvitationUpdateManyWithoutCircleNestedInput
    consents?: ConsentUpdateManyWithoutCircleNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCircleNestedInput
  }

  export type CareCircleUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: CareCircleMemberUncheckedUpdateManyWithoutCircleNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutCircleNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutCircleNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCircleNestedInput
  }

  export type CareCircleUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareCircleUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: UserUpdateOneRequiredWithoutPatientCirclesNestedInput
    memberships?: CareCircleMemberUpdateManyWithoutCircleNestedInput
    invitations?: InvitationUpdateManyWithoutCircleNestedInput
    consents?: ConsentUpdateManyWithoutCircleNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCircleNestedInput
  }

  export type CareCircleUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: CareCircleMemberUncheckedUpdateManyWithoutCircleNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutCircleNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutCircleNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCircleNestedInput
  }

  export type CareCircleUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareCircleMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    circle?: CareCircleUpdateOneRequiredWithoutMembershipsNestedInput
    role?: RoleUpdateOneRequiredWithoutMembershipsNestedInput
    consents?: ConsentUpdateManyWithoutMemberNestedInput
  }

  export type CareCircleMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consents?: ConsentUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type CareCircleMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationUpdateWithoutInvitedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    tokenHash?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    circle?: CareCircleUpdateOneRequiredWithoutInvitationsNestedInput
    role?: RoleUpdateOneRequiredWithoutInvitationsNestedInput
  }

  export type InvitationUncheckedUpdateWithoutInvitedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    tokenHash?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationUncheckedUpdateManyWithoutInvitedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    tokenHash?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentUpdateWithoutGrantedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    scope?: JsonNullValueInput | InputJsonValue
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    circle?: CareCircleUpdateOneRequiredWithoutConsentsNestedInput
    member?: CareCircleMemberUpdateOneRequiredWithoutConsentsNestedInput
  }

  export type ConsentUncheckedUpdateWithoutGrantedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    scope?: JsonNullValueInput | InputJsonValue
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConsentUncheckedUpdateManyWithoutGrantedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    scope?: JsonNullValueInput | InputJsonValue
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuditLogUpdateWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    circle?: CareCircleUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareCircleMemberCreateManyCircleInput = {
    id?: string
    userId: string
    roleId: string
    status?: $Enums.MemberStatus
    joinedAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type InvitationCreateManyCircleInput = {
    id?: string
    invitedById: string
    roleId: string
    email?: string | null
    phone?: string | null
    tokenHash: string
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ConsentCreateManyCircleInput = {
    id?: string
    memberId: string
    grantedById: string
    status?: $Enums.ConsentStatus
    scope: JsonNullValueInput | InputJsonValue
    grantedAt?: Date | string
    revokedAt?: Date | string | null
    expiresAt?: Date | string | null
  }

  export type AuditLogCreateManyCircleInput = {
    id?: string
    actorId: string
    action: string
    resourceType: string
    resourceId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type CareCircleMemberUpdateWithoutCircleInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
    role?: RoleUpdateOneRequiredWithoutMembershipsNestedInput
    consents?: ConsentUpdateManyWithoutMemberNestedInput
  }

  export type CareCircleMemberUncheckedUpdateWithoutCircleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consents?: ConsentUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type CareCircleMemberUncheckedUpdateManyWithoutCircleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InvitationUpdateWithoutCircleInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    tokenHash?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitedBy?: UserUpdateOneRequiredWithoutSentInvitationsNestedInput
    role?: RoleUpdateOneRequiredWithoutInvitationsNestedInput
  }

  export type InvitationUncheckedUpdateWithoutCircleInput = {
    id?: StringFieldUpdateOperationsInput | string
    invitedById?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    tokenHash?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationUncheckedUpdateManyWithoutCircleInput = {
    id?: StringFieldUpdateOperationsInput | string
    invitedById?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    tokenHash?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentUpdateWithoutCircleInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    scope?: JsonNullValueInput | InputJsonValue
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    member?: CareCircleMemberUpdateOneRequiredWithoutConsentsNestedInput
    grantedBy?: UserUpdateOneRequiredWithoutConsentsGrantedNestedInput
  }

  export type ConsentUncheckedUpdateWithoutCircleInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    grantedById?: StringFieldUpdateOperationsInput | string
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    scope?: JsonNullValueInput | InputJsonValue
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConsentUncheckedUpdateManyWithoutCircleInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    grantedById?: StringFieldUpdateOperationsInput | string
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    scope?: JsonNullValueInput | InputJsonValue
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuditLogUpdateWithoutCircleInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actor?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutCircleInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutCircleInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentCreateManyMemberInput = {
    id?: string
    circleId: string
    grantedById: string
    status?: $Enums.ConsentStatus
    scope: JsonNullValueInput | InputJsonValue
    grantedAt?: Date | string
    revokedAt?: Date | string | null
    expiresAt?: Date | string | null
  }

  export type ConsentUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    scope?: JsonNullValueInput | InputJsonValue
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    circle?: CareCircleUpdateOneRequiredWithoutConsentsNestedInput
    grantedBy?: UserUpdateOneRequiredWithoutConsentsGrantedNestedInput
  }

  export type ConsentUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    grantedById?: StringFieldUpdateOperationsInput | string
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    scope?: JsonNullValueInput | InputJsonValue
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConsentUncheckedUpdateManyWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    grantedById?: StringFieldUpdateOperationsInput | string
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    scope?: JsonNullValueInput | InputJsonValue
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CareCircleMemberCreateManyRoleInput = {
    id?: string
    circleId: string
    userId: string
    status?: $Enums.MemberStatus
    joinedAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type RolePermissionCreateManyRoleInput = {
    permissionId: string
  }

  export type InvitationCreateManyRoleInput = {
    id?: string
    circleId: string
    invitedById: string
    email?: string | null
    phone?: string | null
    tokenHash: string
    status?: $Enums.InvitationStatus
    expiresAt: Date | string
    acceptedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CareCircleMemberUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    circle?: CareCircleUpdateOneRequiredWithoutMembershipsNestedInput
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
    consents?: ConsentUpdateManyWithoutMemberNestedInput
  }

  export type CareCircleMemberUncheckedUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consents?: ConsentUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type CareCircleMemberUncheckedUpdateManyWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RolePermissionUpdateWithoutRoleInput = {
    permission?: PermissionUpdateOneRequiredWithoutRolePermissionsNestedInput
  }

  export type RolePermissionUncheckedUpdateWithoutRoleInput = {
    permissionId?: StringFieldUpdateOperationsInput | string
  }

  export type RolePermissionUncheckedUpdateManyWithoutRoleInput = {
    permissionId?: StringFieldUpdateOperationsInput | string
  }

  export type InvitationUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    tokenHash?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    circle?: CareCircleUpdateOneRequiredWithoutInvitationsNestedInput
    invitedBy?: UserUpdateOneRequiredWithoutSentInvitationsNestedInput
  }

  export type InvitationUncheckedUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    invitedById?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    tokenHash?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationUncheckedUpdateManyWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    circleId?: StringFieldUpdateOperationsInput | string
    invitedById?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    tokenHash?: StringFieldUpdateOperationsInput | string
    status?: EnumInvitationStatusFieldUpdateOperationsInput | $Enums.InvitationStatus
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionCreateManyPermissionInput = {
    roleId: string
  }

  export type RolePermissionUpdateWithoutPermissionInput = {
    role?: RoleUpdateOneRequiredWithoutRolePermissionsNestedInput
  }

  export type RolePermissionUncheckedUpdateWithoutPermissionInput = {
    roleId?: StringFieldUpdateOperationsInput | string
  }

  export type RolePermissionUncheckedUpdateManyWithoutPermissionInput = {
    roleId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
# Project Structure

In this section, you will become familar with the folder structure of the project.

### Directory Tree

```
src
├───config
├───constants
├───controllers
│   └───user
│       ├───ratelimits
│       └───validations
├───lib
├───mappers
│   └───user
├───middleware
│   ├───errors
│   ├───ratelimit
│   └───unknownRoute
├───providers
│   ├───database
│   └───redis
├───serializers
│   ├───date
│   └───snowflake
├───services
│   └───user
├───struct
│   ├───errors
│   │   └───api
│   └───ratelimit
├───utils
│   ├───catchServerError
│   ├───crypto
│   ├───implement
│   ├───logger
│   └───snowflake
└───validations
```

#### [Config](config-and-constants.md)

The config directory contains files which group different configuration options.

#### [Constants](config-and-constants.md)

The constants directory contains files which group different constants used across the project.

#### [Controllers](controllers.md)

Controllers handle incoming requests and are responsible for responding back the client. Controllers should
only define the behaviour of a route, not the functionality such as querying a database within the controller.

#### [Lib](project-structure.md)

The lib directory contains the functionality and logic for the template. You probably won't need to touch this
unless you're contributing to the template.

#### [Struct](project-structure.md)

Your classes should be defined in the struct (structures) directory. The template comes with two main
categories of classes: errors and ratelimit. You will find an ApiError class which you can use to construct
errors. The `errors/api/codes` directory contains errors that are reused throughout the project. For example
`unknown/UnknownUser.ts` returns a 404 error when a user cannot be found with the error code 40001. Error
codes are user-defined, you can define them how you like.

#### [Services](project-structure.md)

Services contain all your logic that can be used in the controllers. An example `UserService` is included with
the template which simply queries the database.

#### [Middleware](middleware.md)

Your middleware is likely to be reused, so it's split into it's own directory. Middleware can be applied using
the `@Middleware` decorator (more info in the middleware section). The project comes with internal error
handling, ratelimiting and 404 route handling out the box.

#### [Providers](providers.md)

Providers are classes that connect to your databases. The project comes with a database and redis provider to
handling both persistent storage and caching.

#### [Serializers](mappers-and-serializers.md)

Serializers convert data into a different type, and vice visa. For example, the snowflake serializers
serializes a bigint to string, and deserializes a string to a bigint.

#### [Mappers](mappers-and-serializers.md)

Mappers are used to maintain consistency between responses. They also prevent you from leaking raw data
through the API without implicitly defining what is returned from each route. You should use mappers for all
your responses to implicity state what should be included in your response.

#### [Utils](general-utilities.md)

Utils contains the common utilities such as functions or shared types used throughout the project.

**[▶ Next Section: Config & Constants](project-structure.md)**

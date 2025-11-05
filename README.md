# Result Library

The Result library is a TypeScript utility that provides a structured way to handle success (`Ok`) and failure (`Err`) cases in your application. It is inspired by functional programming patterns and languages like Rust, enabling robust error handling without relying on exceptions.

## Features

- **Type Safety**: Explicitly handle `Ok` and `Err` cases with strong TypeScript typings.
- **Convenient API**: Simplifies handling success and error scenarios with intuitive methods.
- **Improved Error Handling**: Avoid unexpected runtime errors with structured control flows.
- **Reusable Components**: Easily integrate into any TypeScript project.

## Installation

```bash
npm install result-library
```

## Usage

### Simpler Version

```typescript
import { Err, Ok, type Result } from 'result-library'

function maybeNumber(success: boolean): Result<number, string> {
    if(success) return new Ok(1)
    return new Err("it failed")
}

maybeNumber(true).unwrap() // 1
maybeNumber(false).unwrap_err() // "it failed"
```

### Creating Results

To create `Ok` and `Err` results, use the `ResultBuilder` interface.

```typescript
import { ResultBuilder } from 'result-library';

const { Ok, Err } = ResultBuilder<string, string>();

const success = Ok("Operation was successful");
const failure = Err("An error occurred");
```

### Checking Results

```typescript
if (success.is_ok()) {
  console.log("Success:", success.unwrap());
} else {
  console.error("Error:", success.err());
}

if (failure.is_err()) {
  console.error("Failure:", failure.unwrap_err());
}
```

### Example Use Case

```typescript
function divide(a: number, b: number) {
  const { Ok, Err } = ResultBuilder<number, string>();
  if (b === 0) {
    return Err("Division by zero is not allowed");
  }
  return Ok(a / b);
}

const result = divide(10, 2);
if (result.is_ok()) {
  console.log("Result:", result.unwrap());
} else {
  console.error("Error:", result.unwrap_err());
}
```

### Advanced Usage with Types

You can define explicit types for better type safety.

```typescript
const { Ok, Err } = ResultBuilder<number, string>();
const result = Ok(42);
const error = Err("Something went wrong");

if (result.is_ok()) {
  console.log(result.unwrap());
} else {
  console.error(result.unwrap_err());
}
```

### Additional Example: Handling Multiple Cases

```typescript
function fetchUserData(userId: string) {
  const { Ok, Err } = ResultBuilder<{ name: string; age: number }, string>();
  if (userId === "123") {
    return Ok({ name: "John Doe", age: 30 });
  } else {
    return Err("User not found");
  }
}

const userResult = fetchUserData("123");
if (userResult.is_ok()) {
  console.log("User Data:", userResult.unwrap());
} else {
  console.error("Error:", userResult.unwrap_err());
}
```

### Use Case: File Processing

```typescript
function processFile(filePath: string) {
  const { Ok, Err } = ResultBuilder<string, string>();

  if (!filePath.endsWith(".txt")) {
    return Err("Only .txt files are supported");
  }

  try {
    const fileContent = "File content"; // Simulate reading a file
    return Ok(fileContent);
  } catch (error) {
    return Err("Failed to process the file");
  }
}

const fileResult = processFile("example.txt");
if (fileResult.is_ok()) {
  console.log("File Content:", fileResult.unwrap());
} else {
  console.error("Error:", fileResult.unwrap_err());
}
```

### Use Case: API Response Handling

```typescript
async function fetchData(apiUrl: string) {
  const { Ok, Err } = ResultBuilder<any, string>();

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return Err(`API error: ${response.status}`);
    }
    const data = await response.json();
    return Ok(data);
  } catch (error) {
    return Err("Network error");
  }
}

(async () => {
  const apiResult = await fetchData("https://api.example.com/data");
  if (apiResult.is_ok()) {
    console.log("API Data:", apiResult.unwrap());
  } else {
    console.error("Error:", apiResult.unwrap_err());
  }
})();
```

The `Result` class provides a way to handle success and error outcomes in a structured way. Below is an example demonstrating how to use `Ok`, `Err`, and the `ResultBuilder` to handle different results.

### Code Example:

```typescript
import { ResultBuilder } from 'result-library';

// deconstruct ResultBuilder and create Ok, Err builder instance
const { Ok, Err } = ResultBuilder<string, string>();

// Simulate a function that can either succeed or fail
function fetchData(success: boolean) {
  if (success) {
    return Ok('Data retrieved successfully');
  } else {
    return Err('Failed to retrieve data');
  }
}

// Simulate a success scenario
const successResult = fetchData(true);
if (successResult.is_ok()) {
  console.log(successResult.ok()); // Output: 'Data retrieved successfully'
} else {
  console.log(successResult.err());
}

// Simulate an error scenario
const errorResult = fetchData(false);
if (errorResult.is_err()) {
  console.log(errorResult.err()); // Output: 'Failed to retrieve data'
} else {
  console.log(errorResult.ok());
}

try {
  console.log(successResult.unwrap()); // Output: 'Data retrieved successfully'
  console.log(errorResult.unwrap()); // Throws error: "Called unwrap() on an Ok value"
} catch (e) {
  console.error(e.message);
}

try {
  console.log(successResult.unwrap_err()); // Throws error: "Called unwrap_err() on an Ok value"
} catch (e) {
  console.error(e.message);
}
```

## Advantages

1. **Eliminates Ambiguity**: Clear distinction between success and error states.
2. **Improves Readability**: Code is more declarative and self-documenting.
3. **Avoids Exceptions**: Encourages error handling through return types instead of exceptions.
4. **Enhances Debugging**: Easily identify and manage error cases.

## API Reference

### `Result<A, E>`

A generic class representing either a success (`Ok`) or failure (`Err`) value.

#### Methods:

- **`is_ok(): boolean`**: Returns `true` if the result is `Ok`.
- **`is_err(): boolean`**: Returns `true` if the result is `Err`.
- **`ok(): A`**: Retrieves the success value.
- **`err(): E`**: Retrieves the error value.
- **`unwrap(): A`**: Returns the success value or throws an error if the result is `Err`.
- **`unwrap_err(): E`**: Returns the error value or throws an error if the result is `Ok`.
 - **`unwrapErr(): E`**: CamelCase alias for `unwrap_err()`.
 - **`when<R>({ ok, err }): R`**: Branch on `Ok`/`Err` and return `R`.
 - **`fold<R>({ ok, err }): Promise<R>`**: Async-friendly branching; handlers may return `R` or `Promise<R>`.
 - **`map<RT>(mapper): Result<RT, E>`**: Map the `Ok` artifact.
 - **`mapErr<RE>(mapper): Result<A, RE>`**: Map the `Err` error.
 - **`mapOr<RT>(mapper, defaultValue): RT`**: Map the `Ok` artifact, otherwise return `defaultValue`.
 - **`mapOrElse<RT>(mapper, errMapper): RT`**: Map the `Ok` artifact, otherwise compute from error.
 - **`mapOrErr<RE>(mapper, defaultValue): RE`**: On `Ok`, return `defaultValue`; on `Err`, map the error.
 - **`mapErrOr<RT>(mapper, defaultValue): RT`**: On `Ok`, return `defaultValue`; on `Err`, map the error to `RT`.
 - **`mapErrOrElse<T>(mapper, defaultValue): T`**: On `Ok`, return `defaultValue`; on `Err`, map error to `T`.
 - **`unwrapOr(defaultValue): A`**: Return the artifact or `defaultValue`.
 - **`unwrapOrElse(defaultValue): A`**: Return the artifact or compute it from error.

### `Ok<A, E>`

A subclass of `Result` representing a success state.

### `Err<E, A>`

A subclass of `Result` representing an error state.

### `ResultBuilder`

An interface for creating `Ok` and `Err` instances.

- **`Ok<A, E>(value: A): Ok<A, E>`**: Creates an `Ok` result with the given value.
- **`Err<E, A>(error: E): Err<E, A>`**: Creates an `Err` result with the given error.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for enhancements or bug fixes.

## License

This library is licensed under the MIT License. See `LICENSE` for details.


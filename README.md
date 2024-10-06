# opencti-client

This is a TypeScript library for interacting with OpenCTI

# Build

`pnpm run build`

# Local Development

## Testing

Copy the test environment file and fill in the values:

```bash
cp ./test/.t.env.example ./test/.t.env
```

To test this package in an external project:

1. Build the package locally:

    ```
    pnpm run build
    ```

2. Link the opencti-client globally

`pnpm link --global`

3. Link in your test project

`pnpm link --global @security-alliance/opencti-client`

4. Import and use the package in your external project:

    ```typescript
    import { OpenCTIClient } from "@seal-isac/opencti-client";

    // Use the package as needed
    ```

5. Run your external project to test the integration.

6. When finished testing, remove the local reference from your external project's `package.json` and run `pnpm install` again to clean up.

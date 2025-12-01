# Media

## Overview

The Media feature handles file uploads (images, documents).

## CRITICAL INSTRUCTION

**DO NOT CREATE ANY UI FOR THIS FEATURE.**

- This is a backend-only feature used by other features (e.g., Events, Team) to store images.
- The Skeleton Agent must **NOT** create a `/media` page or any components for this feature.
- Images stored here are accessed via the `url` property on `Media` objects returned by other queries.

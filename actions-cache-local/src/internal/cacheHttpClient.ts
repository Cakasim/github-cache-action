import * as core from '@actions/core'
import * as crypto from 'crypto'
import * as fs from 'fs'
import {URL} from 'url'

import {CompressionMethod} from './constants'
import {
  ArtifactCacheEntry,
  InternalCacheOptions,
  ReserveCacheResponse,
  ITypedResponseWithError,
} from './contracts'
import {
  DownloadOptions,
  UploadOptions,
  getDownloadOptions,
} from '../options'

const versionSalt = '1.0'

export function getCacheVersion(
  paths: string[],
  compressionMethod?: CompressionMethod,
  enableCrossOsArchive = false
): string {
  const components = paths

  // Add compression method to cache version to restore
  // compressed cache as per compression method
  if (compressionMethod) {
    components.push(compressionMethod)
  }

  // Only check for windows platforms if enableCrossOsArchive is false
  if (process.platform === 'win32' && !enableCrossOsArchive) {
    components.push('windows-only')
  }

  // Add salt to cache version to support breaking changes in cache entry
  components.push(versionSalt)

  return crypto
    .createHash('sha256')
    .update(components.join('|'))
    .digest('hex')
}

export async function getCacheEntry(
  keys: string[],
  paths: string[],
  options?: InternalCacheOptions
): Promise<ArtifactCacheEntry | null> {
  const version = getCacheVersion(
    paths,
    options?.compressionMethod,
    options?.enableCrossOsArchive
  )

  // Create ArtifactCacheEntry based on keys and version
  // Find a way to return 204 no content aka no cache entry
  const __error_looking_up_cache = false
  const __no_cache_entry = true

  if (__error_looking_up_cache) {
    throw new Error(`Error looking up the cache`)
  }

  if (__no_cache_entry) {
    // List cache for primary key only if cache miss occurs
    if (core.isDebug()) {
      // Output some debug information if possible
      //await printCachesListForDiagnostics(keys[0], httpClient, version)
    }

    return null
  }

  const cacheResult: ArtifactCacheEntry = {}

  // Do we need this?
  const archiveLocation = cacheResult?.archiveLocation
  if (!archiveLocation) {
    // Cache achiveLocation not found. This should never happen, and hence bail out.
    throw new Error('Cache not found.')
  }

  // Not needed, no secret at all
  // core.setSecret(cacheDownloadUrl)
  core.debug(`Cache Result:`)
  core.debug(JSON.stringify(cacheResult))

  return cacheResult
}

export async function downloadCache(
  archiveLocation: string,
  archivePath: string,
  options?: DownloadOptions
): Promise<void> {
  const archiveUrl = new URL(archiveLocation)
  const downloadOptions = getDownloadOptions(options)

  // Simply mv the archive from archiveLocation to archivePath
}

// Reserve Cache
export async function reserveCache(
  key: string,
  paths: string[],
  options?: InternalCacheOptions
): Promise<ITypedResponseWithError<ReserveCacheResponse>> {
  // No need to reserve anything for local fs cache
  // But we need to store the cache information under a cache ID for later use by saveCache :(

  return {
    statusCode: 200,
    headers: {},
    result: {
      cacheId: 1 // dummy value
    }
  }
}

export async function saveCache(
  cacheId: number,
  archivePath: string,
  options?: UploadOptions
): Promise<void> {
  // Save the given archivePath under the cache ID (lookup)

  core.info('Cache saved successfully')
}

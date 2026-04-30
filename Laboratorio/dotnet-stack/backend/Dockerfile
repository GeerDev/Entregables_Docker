# ---- Build stage ----
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build

WORKDIR /source

COPY backend.csproj .
RUN dotnet restore

COPY . .
RUN dotnet publish -c Release -o /app --no-restore

# ---- Runtime stage ----
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS runtime

WORKDIR /app
COPY --from=build /app .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

ENTRYPOINT ["dotnet", "backend.dll"]

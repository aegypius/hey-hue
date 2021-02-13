# language: en
Feature: Bridges discovery
  In order to interact with bridges
  As an anonymous user
  I want to be able to discover bridges

Scenario: Basic bridges discovery
  Given the following bridges or discoverables:
    | name       | ipaddress |
    | Bridge #1  | 10.0.0.1  |
    | Bridge #2  | 10.0.0.2  |
  When I execute GraphQL query:
  """
    query {
      DiscoverBridges {
        name
        ipaddress
      }
    }
  """
  Then the response should contain JSON:
  """
    {
      "DiscoverBridges": [{
        "name": "Bridge #1",
        "ipaddress": "10.0.0.1"
      }, {
        "name": "Bridge #2",
        "ipaddress": "10.0.0.2"
      }]
    }
  """
